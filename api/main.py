from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import datetime
import uuid

app = FastAPI(title="MarketIQ Enterprise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. DATABASE INITIALIZATION & REALISTIC SEED DATA ---
def init_db():
    conn = sqlite3.connect('marketiq.db')
    cursor = conn.cursor()
    
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
    
    # Check if DB is empty, if so, seed realistic presentation data
    cursor.execute('SELECT COUNT(*) FROM clients')
    if cursor.fetchone()[0] == 0:
        # 1. Seed Clients
        clients_data = [
            ('CLI-9001', 'Sharma Sweets', 'Rahul Sharma', 'Google Local SEO', 25000, 'Active', '2026-08-15'),
            ('CLI-9002', 'City Hospital', 'Dr. Priya Singh', 'Meta Ads', 65000, 'Onboarding', '2026-10-20'),
            ('CLI-9003', 'Apex Dental Clinic', 'Dr. Vikram', 'Google Local SEO', 18000, 'Active', '2026-09-28'),
            ('CLI-9004', 'Urban Salon & Spa', 'Neha Kapoor', 'Meta Ads', 35000, 'Active', '2026-10-05'),
            ('CLI-9005', 'FitCore Gym', 'Amit Verma', 'WhatsApp CRM', 15000, 'Pending', '2026-10-22'),
            ('CLI-9006', 'GreenLeaf Organics', 'Sneha Gupta', 'Google Local SEO', 22000, 'Active', '2026-08-10'),
            ('CLI-9007', 'BlueWave Travels', 'Karan Patel', 'Meta Ads', 0, 'Lead', '2026-10-25'),
            ('CLI-9008', 'Royal Cafe', 'Aman Singh', 'Meta Ads', 16000, 'Active', '2026-07-22'),
        ]
        cursor.executemany("INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?, ?)", clients_data)

        # 2. Seed Tasks
        tasks_data = [
            (str(uuid.uuid4())[:8], 'Setup Meta Pixel for Urban Salon & Spa', 'Completed', '2026-10-06'),
            (str(uuid.uuid4())[:8], 'Keyword Research for Apex Dental', 'Completed', '2026-09-29'),
            (str(uuid.uuid4())[:8], 'Draft WhatsApp templates for FitCore Gym', 'Pending', '2026-10-23'),
            (str(uuid.uuid4())[:8], 'Onboarding call with City Hospital', 'Pending', '2026-10-21'),
            (str(uuid.uuid4())[:8], 'Generate Q3 Reports for Active Clients', 'Pending', '2026-10-26'),
            (str(uuid.uuid4())[:8], 'Follow up with BlueWave Travels lead', 'Pending', '2026-10-26'),
        ]
        cursor.executemany("INSERT INTO tasks VALUES (?, ?, ?, ?)", tasks_data)

        # 3. Seed Audit Logs
        activities_data = [
            (str(uuid.uuid4()), 'Admin exported Q3 Client Pipeline CSV', '2026-10-27 10:15:22'),
            (str(uuid.uuid4()), 'System generated automated invoice for Urban Salon', '2026-10-26 08:00:00'),
            (str(uuid.uuid4()), 'New lead captured: BlueWave Travels via Meta Ads', '2026-10-25 09:12:45'),
            (str(uuid.uuid4()), 'Admin onboarded new client: City Hospital', '2026-10-20 11:45:10'),
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
    client_id = f"CLI-{cursor.execute('SELECT COUNT(*) FROM clients').fetchone()[0] + 9001}"
    date_now = datetime.datetime.now().strftime("%Y-%m-%d")
    
    cursor.execute("INSERT INTO clients VALUES (?, ?, ?, ?, ?, ?, ?)",
        (client_id, client.client_name, client.contact_person, client.service, client.mrr, "Onboarding", date_now))
    
    task_id1 = str(uuid.uuid4())[:8]
    task_id2 = str(uuid.uuid4())[:8]
    cursor.execute("INSERT INTO tasks VALUES (?, ?, ?, ?)", (task_id1, f"Setup Billing Profile for {client.client_name}", "Pending", date_now))
    cursor.execute("INSERT INTO tasks VALUES (?, ?, ?, ?)", (task_id2, f"Assign Account Manager to {client.client_name}", "Pending", date_now))
    
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