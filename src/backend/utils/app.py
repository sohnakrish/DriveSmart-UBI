# ==============================================================
# 🚗 DriveSmart UBI - Real-Time Behavior Prediction API (v1.0)
# ==============================================================
# Author: Sohna
# Description:
# FastAPI backend that predicts driving behavior (Normal, Sharp Turn,
# Aggressive Turn) using a trained telematics ML model.
# ==============================================================

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# --------------------------------------------------------------
# ✅ Initialize FastAPI App
# --------------------------------------------------------------
app = FastAPI(
    title="DriveSmart UBI - Real-Time Behavior Prediction API",
    description="Predicts driving behavior (Normal / Sharp Turn / Aggressive Turn) using trained telematics model.",
    version="1.0.0"
)

# --------------------------------------------------------------
# ✅ Enable CORS (for frontend integration)
# --------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------------------
# ✅ Load the Saved Model & Label Encoder
# --------------------------------------------------------------
try:
    model = joblib.load("../models/drive_smart_model.pkl")
    encoder = joblib.load("../models/label_encoder.pkl")
    print("✅ Model and label encoder loaded successfully.")
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    model = None
    encoder = None


# --------------------------------------------------------------
# ✅ Define Input Schema
# --------------------------------------------------------------
class TelemetryData(BaseModel):
    gps_speed: float
    total_acceleration: float
    hard_brake_event: int


# --------------------------------------------------------------
# ✅ Root Endpoint
# --------------------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "🚗 DriveSmart UBI API is live and running!",
        "endpoints": {
            "predict_single": "/predict",
            "health_check": "/health"
        },
        "status": "✅ OK",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }


# --------------------------------------------------------------
# ✅ Prediction Endpoint
# --------------------------------------------------------------
@app.post("/predict")
def predict_behavior(data: TelemetryData):
    """
    Predicts driving behavior from telemetry data.
    Input: gps_speed, total_acceleration, hard_brake_event
    """
    if model is None or encoder is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please retrain or check model files.")

    try:
        # Prepare input array
        input_data = np.array([[data.gps_speed, data.total_acceleration, data.hard_brake_event]])

        # Predict class and confidence
        prediction = model.predict(input_data)[0]
        probabilities = model.predict_proba(input_data)[0]
        confidence = float(np.max(probabilities))

        # Decode label name
        predicted_label = encoder.inverse_transform([prediction])[0]

        print(f"🧭 Input: {data.dict()} → Predicted: {predicted_label} ({confidence:.2f})")

        return {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "prediction": predicted_label,
            "confidence": round(confidence, 2),
            "input": data.dict()
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {e}")


# --------------------------------------------------------------
# ✅ Health Check Endpoint
# --------------------------------------------------------------
@app.get("/health")
def health_check():
    return {
        "status": "✅ Healthy",
        "model_loaded": model is not None,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }


# --------------------------------------------------------------
# ✅ Local Run
# --------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
