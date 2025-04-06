import psutil
import platform
import requests
import time
from datetime import datetime, timezone

# === Configuration ===
API_ENDPOINT = "http://localhost:8000/api/system-data"  # Change to your backend URL if needed
DEVICE_ID = platform.node()
SEND_INTERVAL = 60  # seconds

# === Helpers ===
def get_cpu_temperature():
    try:
        temps = psutil.sensors_temperatures()
        if not temps:
            return None
        for name, entries in temps.items():
            for entry in entries:
                if entry.current is not None:
                    return entry.current
    except Exception as e:
        print(f"[WARN] Could not read CPU temperature: {e}")
    return None

# === Data Collection ===
def collect_system_data():
    battery = psutil.sensors_battery()
    cpu_temp = get_cpu_temperature()

    data = {
        "deviceId": DEVICE_ID,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "os": platform.system(),
        "battery": {
            "percent": battery.percent if battery else None,
            "plugged": battery.power_plugged if battery else None
        },
        "cpu": {
            "usage": psutil.cpu_percent(interval=1),
            "temperature": cpu_temp
        },
        "memory": {
            "total": round(psutil.virtual_memory().total / 1024 / 1024),  # in MB
            "used": round(psutil.virtual_memory().used / 1024 / 1024),
            "percent": psutil.virtual_memory().percent
        },
        "disk": {
            "total": round(psutil.disk_usage('/').total / 1024 / 1024),  # in MB
            "used": round(psutil.disk_usage('/').used / 1024 / 1024),
            "percent": psutil.disk_usage('/').percent
        },
        "uptime": int(time.time() - psutil.boot_time())
    }

    return data

# === Main Loop ===
def run_agent():
    while True:
        try:
            data = collect_system_data()
            response = requests.post(
                API_ENDPOINT,
                json=data,
                headers={'Content-Type': 'application/json'}
            )
            print(f"[{datetime.now()}] Sent data: {response.status_code}")
        except requests.exceptions.ConnectionError:
            print(f"[ERROR] Could not connect to {API_ENDPOINT}. Is your server running?")
        except Exception as e:
            print(f"[ERROR] Failed to send data: {e}")
        time.sleep(SEND_INTERVAL)

if __name__ == "__main__":
    run_agent()
