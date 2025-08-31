import pandas as pd
from sklearn.linear_model import LinearRegression

def train_yield_predictor():
    data = {
        "rainfall_mm": [800, 750, 900, 650],
        "temperature": [25, 27, 24, 29],
        "yield_tonnes": [300, 280, 350, 250]
    }
    df = pd.DataFrame(data)

    X = df[["rainfall_mm", "temperature"]]
    y = df["yield_tonnes"]

    model = LinearRegression()
    model.fit(X, y)
    return model
