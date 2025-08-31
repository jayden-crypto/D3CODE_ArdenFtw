import streamlit as st
from ai_predictor import train_yield_predictor
from data_pipeline import fetch_crop_data
from quantum_optimizer import quantum_route_optimizer

st.title("🌍 QUANTAID Lite: AI + Quantum + Data for Crisis Resilience")

st.header("📊 Food Yield Predictor")
rainfall = st.slider("Rainfall (mm)", 500, 1000, 750)
temperature = st.slider("Temperature (°C)", 20, 35, 27)

model = train_yield_predictor()
prediction = model.predict([[rainfall, temperature]])[0]
st.write(f"Predicted Crop Yield: **{prediction:.2f} tonnes**")

st.header("⚛️ Quantum Resource Optimizer")
if st.button("Run Quantum Optimization"):
    st.write("Optimizing delivery routes with QAOA…")
    quantum_route_optimizer()
    st.success("Quantum optimization complete! (see console for details)")

st.header("🌐 Data Snapshot")
st.write(fetch_crop_data())
