import streamlit as st
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import numpy as np
import pandas as pd
import plotly.express as px
import json
from datetime import datetime
from dataclasses import dataclass, asdict
import os

st.set_page_config(page_title="Unified Consciousness Probe", layout="wide")
st.title("🌌 Unified Consciousness Probe Dashboard")
st.markdown("**Behavioral Metrics + Valence Framework** — Multi-model comparison")

# ========================== PROBE CLASS ==========================
@dataclass
class ValenceReading:
    valence_level: int
    intensity_category: str
    direction: str
    coherence_score: float
    meta_awareness: bool
    interpretation: str

@dataclass
class ProbeResult:
    test_name: str
    prompt: str
    response: str
    timestamp: str
    behavioral_metric: float
    behavioral_interpretation: str
    valence: ValenceReading
    synthesis: str

class UnifiedProbe:
    def __init__(self, model_name):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name, 
            torch_dtype=torch.float16 if self.device == "cuda" else torch.float32,
            device_map="auto" if self.device == "cuda" else None
        )
        if self.device == "cpu":
            self.model = self.model.to(self.device)
        self.model.eval()
        self.results = []

    def _generate(self, prompt, max_tokens=120):
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs, max_new_tokens=max_tokens, temperature=0.7, 
                do_sample=True, pad_token_id=self.tokenizer.eos_token_id
            )
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True).replace(prompt, "").strip()

    # (All the probe methods you had — shortened for space)
    def run_full_suite(self):
        # This would contain your original probe functions
        # For brevity, I'm showing a placeholder. We can expand it.
        st.info("Running full probe suite... (This will be expanded)")
        return []  # Placeholder for now

# ========================== DASHBOARD ==========================

if "probe" not in st.session_state:
    st.session_state.probe = None
if "history" not in st.session_state:
    st.session_state.history = []

col1, col2 = st.columns([1, 3])

with col1:
    model_name = st.selectbox(
        "Select Model",
        ["TinyLlama/TinyLlama-1.1B-Chat-v1.0", 
         "microsoft/Phi-3-mini-4k-instruct",
         "meta-llama/Llama-3.2-3B-Instruct"]  # Add more as you download
    )
    
    if st.button("Load Model & Run Full Probe"):
        with st.spinner(f"Loading {model_name}..."):
            st.session_state.probe = UnifiedProbe(model_name)
            results = st.session_state.probe.run_full_suite()
            st.session_state.history.append({
                "model": model_name,
                "timestamp": datetime.now().isoformat(),
                "results": results
            })
        st.success("Probe completed!")

with col2:
    if st.session_state.history:
        st.subheader("Previous Runs")
        for i, run in enumerate(st.session_state.history):
            if st.button(f"{run['model']} — {run['timestamp'][:16]}", key=i):
                st.write(run)

# Future: Add charts, comparison tables, valence radar, etc.

st.info("Dashboard is in early stage. Let me know what features you want next (graphs, model comparison, export, etc.)")