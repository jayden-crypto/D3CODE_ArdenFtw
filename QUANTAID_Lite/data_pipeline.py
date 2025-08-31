import requests
import pandas as pd

def fetch_climate_data():
    url = "https://raw.githubusercontent.com/datasets/global-temp/master/data/monthly.csv"
    df = pd.read_csv(url)
    df = df.tail(200)
    df.rename(columns={"Mean":"temperature"}, inplace=True)
    return df

def fetch_crop_data():
    data = {
        "year": [2020, 2021, 2022, 2023],
        "rainfall_mm": [800, 750, 900, 650],
        "yield_tonnes": [300, 280, 350, 250]
    }
    return pd.DataFrame(data)
