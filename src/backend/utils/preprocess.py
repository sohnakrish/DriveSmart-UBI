import pandas as pd

def preprocess_packet(packet: dict) -> pd.DataFrame:
    df = pd.DataFrame([{
        "Speed": packet.get("speed", 0),
        "Acceleration": packet.get("acceleration", 0),
        "Brake": packet.get("brake_force", 0)
    }])
    return df
