# DriveSmartUBI

Usage-Based Insurance demo with:
- 🚘 Random Forest ML Model (FastAPI backend)
- 📡 Real-time GPS Simulator
- 🎬 Tesla-dark 3D React Dashboard

## Run order
1. `pip install -r requirements.txt`
2. `cd src/backend && python model_training.py`
3. `uvicorn main:app --reload`
4. `cd ../frontend && npm install && npm run dev`
5. `cd ../simulator && python data_streamer.py`
