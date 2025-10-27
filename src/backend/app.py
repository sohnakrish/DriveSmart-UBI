from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import uvicorn
import os
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI(
    title="DriveSmart UBI - Real-Time Behavior Prediction API",
    description="Predicts driving behavior (Normal / Sharp Turn / Aggressive Turn) using trained telematics model.",
    version="1.0.0"
)

# Allow cross-origin requests (for React / Streamlit frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dynamic model path setup ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # src/
MODEL_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODEL_DIR, "drive_smart_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")

# --- Load model and encoder ---
try:
    model = joblib.load(MODEL_PATH)
    encoder = joblib.load(ENCODER_PATH)
    print(f"✅ Model and label encoder loaded successfully from:\n{MODEL_DIR}")
except Exception as e:
    print(f"❌ Error loading model files: {e}")
    model = None
    encoder = None


# --- Input schema ---
class TelemetryData(BaseModel):
    gps_speed: float
    total_acceleration: float
    hard_brake_event: int


# --- Root endpoint ---
@app.get("/")
def root():
    return {
        "message": "🚗 DriveSmart UBI API is live!",
        "endpoints": {"predict": "/predict"},
        "status": "OK"
    }


# --- Prediction endpoint ---
@app.post("/predict")
def predict_behavior(data: TelemetryData):
    if model is None or encoder is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please retrain or check the model files.")

    try:
        # Prepare input array
        input_data = np.array([[data.gps_speed, data.total_acceleration, data.hard_brake_event]])

        # Predict class and probability
        prediction = model.predict(input_data)[0]
        probabilities = model.predict_proba(input_data)[0]
        confidence = float(np.max(probabilities))

        # Decode label name
        predicted_label = encoder.inverse_transform([prediction])[0]

        response = {
            "prediction": predicted_label,
            "confidence": round(confidence, 2)
        }
        print(f"🧭 Input: {data.dict()} → Predicted: {predicted_label} ({confidence:.2f})")
        return response

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {e}")


# --- Health check endpoint ---
@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}


# --- Run app locally ---
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
