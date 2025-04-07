import joblib

import numpy as np

# Load model

model = joblib.load("model.pkl")

# Function to analyze system issues

def diagnose_issues(data):

    issues = []

    if data['cpu']['temperature'] > 85:

        issues.append("High CPU temperature")

    if data['cpu']['usage'] > 85:

        issues.append("High CPU usage")

    if data['memory']['percent'] > 90:

        issues.append("High memory usage")

    if data['disk']['percent'] > 90:

        issues.append("Low disk space")

    if data['battery']['percent'] < 20:

        issues.append("Low battery")

    if data['uptime'] > 300000:

        issues.append("System running too long")

    return issues

# Function to predict

def predict_maintenance(data):

    features = np.array([

        data['battery']['percent'],

        data['cpu']['usage'],

        data['cpu']['temperature'],

        data['memory']['used'],

        data['memory']['percent'],

        data['disk']['used'],

        data['disk']['percent'],

        data['uptime']

    ]).reshape(1, -1)

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0][1]  # Confidence for class '1'

    issues = diagnose_issues(data)

    return {

        "status": "Needs Maintenance" if prediction == 1 else "Healthy",

        "prediction": int(prediction),

        "confidence": round(probability * 100, 2),

        "issues": issues if prediction == 1 else []

    }

# Example usage

if __name__ == "__main__":

    example_data = {

        "battery": {"percent": 15},

        "cpu": {"usage": 89.2, "temperature": 92},

        "memory": {"used": 7200, "percent": 91.5},

        "disk": {"used": 510000, "percent": 92.4},

        "uptime": 170000

    }

    result = predict_maintenance(example_data)

    print(result)