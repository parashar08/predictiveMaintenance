import pandas as pd

from sklearn.ensemble import RandomForestClassifier

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score

import joblib

# Load dataset

df = pd.read_csv("dataset.csv")

# Features and target

X = df.drop(columns=["needs_maintenance"])

y = df["needs_maintenance"]

# Train/test split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model

model = RandomForestClassifier(n_estimators=100, random_state=42)

model.fit(X_train, y_train)

# Evaluate

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print(f"Model accuracy: {accuracy * 100:.2f}%")

# Save model

joblib.dump(model, "model.pkl")

print("Model saved to model.pkl")