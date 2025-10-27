from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import joblib
from utils.preprocess import preprocess_packet

app = FastAPI(title="DriveSmart UBI Backend")

# Enable CORS so React frontend can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "../../models/risk_model.pkl"
model = joblib.load(MODEL_PATH)

@app.get("/")
async def root():
    return {"message": "✅ DriveSmart UBI Backend is running"}

@app.websocket("/ws/telemetry")
async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_json()
            df = preprocess_packet(data)
            risk_score = model.predict(df)[0]
            await websocket.send_json({
                "risk_score": round(float(risk_score), 2),
                "speed": data.get("speed", 0),
            })
        except Exception as e:
            print("❌ WebSocket error:", e)
            break
