import pandas as pd
import numpy as np

def build_features(df: pd.DataFrame):
    expected_cols = ['gps_speed', 'total_acceleration', 'hard_brake_event', 'event']
    missing = [c for c in expected_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Missing columns in dataset: {missing}")

    X = df[['gps_speed', 'total_acceleration', 'hard_brake_event']].copy()
    y = df['event'].copy()

    # Add Gaussian noise for realistic data variation
    noise = np.random.randn(*X.shape) * 0.02
    X += noise

    X.fillna(X.mean(), inplace=True)
    y.fillna('Unknown', inplace=True)

    print(f"✅ Features ready: {len(X)} samples, {X.shape[1]} features, target 'event'.")
    return X, y
