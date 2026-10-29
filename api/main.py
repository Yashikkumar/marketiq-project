from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import datetime
import uuid

app = FastAPI(title="MarketIQ Enterprise API")

# Allow React to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect('marketiq.db')
    cursor = conn.cursor()
    
    # 1. Create Tables
    cursor.execute('''CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY, client_name TEXT NOT NULL, contact_person TEXT, 
        service TEXT, mrr INTEGER, status TEXT, created_at TEXT
    )''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY, title TEXT NOT NULL, status TEXT, created_at TEXT
    )''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY, description TEXT NOT NULL, timestamp TEXT
    )''')
    
    # 2. Seed Corporate Data if DB is empty
    cursor.execute('SELECT COUNT(*) FROM clients')
    if cursor.fetchone()[0] == 0:
        clients_data = [
            ('CLI-9001', 'TechFlow Solutions', 'Alex Mercer', 'Enterprise SEO', 45000, 'Active', '2026-08-15'),
            ('CLI-9002', 'Lumina Cloud Systems', 'Sarah Chen', 'B2B Lead Gen', 85000, 'Onboarding', '2026-10-20'),
            ('CLI-9003', 'Nexus Retail Group', 'David Torres', 'Enterprise SEO', 55000, 'Active', '2026-09-28'),
            ('CLI-9004', 'Apex Financial Corp', 'Elena Rostova', 'LinkedIn Ads', 120000, 'Active', '2026-10-05'),
            ('CLI-9005', 'Quantum Logistics', 'Michael Chang', 'B2B Lead Gen', 35000, 'Pending', '2026-10-22'),
            ('CLI-9006', 'Horizon Media Partners', 'Rachel Green', 'Enterprise SEO', 42000, 'Active', '2026-08-10'),
        ]
        cursor.executemany("INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?, ?)", clients_data)

        tasks_data = [
            (str(uuid.uuid4())[:8], 'Audit Backlinks for TechFlow Solutions', 'Completed', '2026-10-06'),
            (str(uuid.uuid4())[:8], 'Setup LinkedIn Campaign for Apex Financial', 'Completed', '2026-09-29'),
            (str(uuid.uuid4())[:8], 'Technical SEO check for Lumina Cloud', 'Pending', '2026-10-23'),
            (str(uuid.uuid4())[:8], 'Onboarding call with Quantum Logistics', 'Pending', '2026-10-21'),
        ]
        cursor.executemany("INSERT INTO tasks VALUES (?, ?, ?, ?)", tasks_data)

        activities_data = [
            (str(uuid.uuid4()), 'Admin exported Client Pipeline CSV', '2026-10-27 10:15:22'),
            (str(uuid.uuid4()), 'System generated invoice for Apex Financial', '2026-10-26 08:00:00'),
            (str(uuid.uuid4()), 'New lead captured: Lumina Cloud Systems', '2026-10-20 11:45:10'),
            (str(uuid.uuid4()), 'System Initialized successfully', '2026-07-01 09:00:00'),
        ]
        cursor.executemany("INSERT INTO activities VALUES (?, ?, ?)", activities_data)
    
    conn.commit()
    conn.close()

init_db()

def log_activity(description: str):
    conn = sqlite3.connect('marketiq.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO activities VALUES (?, ?, ?)", (str(uuid.uuid4()), description, datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")))
    conn.commit()
    conn.close()

class ClientData(BaseModel):
    client_name: str
    contact_person: str
    service: str
    mrr: int

@app.get("/api/dashboard")
def get_dashboard_data():
    conn = sqlite3.connect('marketiq.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM clients ORDER BY created_at DESC')
    clients = [{"id": r[0], "client": r[1], "contact": r[2], "source": r[3], "mrr": r[4], "status": r[5]} for r in cursor.fetchall()]
    cursor.execute('SELECT * FROM tasks ORDER BY created_at DESC')
    tasks = [{"id": r[0], "title": r[1], "status": r[2]} for r in cursor.fetchall()]
    cursor.execute('SELECT * FROM activities ORDER BY timestamp DESC LIMIT 15')
    activities = [{"id": r[0], "description": r[1], "time": r[2]} for r in cursor.fetchall()]
    conn.close()
    return {"clients": clients, "tasks": tasks, "activities": activities}

@app.post("/api/clients")
def add_client(client: ClientData):
    conn = sqlite3.connect('marketiq.db')
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM clients')
    count = cursor.fetchone()[0]
    client_id = f"CLI-{9001 + count}"
    date_now = datetime.datetime.now().strftime("%Y-%m-%d")
    
    cursor.execute("INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?, ?)",
        (client_id, client.client_name, client.contact_person, client.service, client.mrr, "Onboarding", date_now))
    
    task_id1 = str(uuid.uuid4())[:8]
    cursor.execute("INSERT INTO tasks VALUES (?, ?, ?, ?)", (task_id1, f"Initial SEO Audit for {client.client_name}", "Pending", date_now))
    
    conn.commit()
    conn.close()
    log_activity(f"Admin onboarded new client: {client.client_name}")
    return {"message": "Client added successfully", "id": client_id}

@app.post("/api/tasks/{task_id}/complete")
def complete_task(task_id: str):
    conn = sqlite3.connect('marketiq.db')
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET status = 'Completed' WHERE id = ?", (task_id,))
    cursor.execute("SELECT title FROM tasks WHERE id = ?", (task_id,))
    title = cursor.fetchone()[0]
    conn.commit()
    conn.close()
    log_activity(f"Task completed: {title}")
    return {"message": "Task completed"}