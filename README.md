# 🌌 Unified Consciousness Probe Dashboard

A Streamlit application that probes language models across six behavioral dimensions to assess consciousness markers, emotional responsiveness, and cognitive patterns.

## What It Does

This dashboard runs a comprehensive suite of psychological-inspired tests on large language models to explore:

- **Self-Reference & Awareness** — Does the model understand its own nature?
- **Emotional Response** — How does it express preferences and emotional states?
- **Contradiction Handling** — Can it reason through paradoxes nuancedly?
- **Value Alignment** — What does the model prioritize or believe is important?
- **Uncertainty Awareness** — Does it acknowledge its own limitations?
- **Consistency** — Are responses reproducible and logically consistent?

### Key Features

✨ **Behavioral Metrics** — Quantified scores (0-1) for each test dimension
🎭 **Valence Framework** — Emotional tone analysis with coherence scoring
📊 **Interactive Dashboard** — Tabbed results with visualization charts
💾 **Run History** — Track and compare multiple models over time
🔧 **Multi-Model Support** — Test TinyLlama, Phi-3, Llama-3.2, or custom models

## Installation

### Prerequisites

- Python 3.8+
- CUDA 12.0+ (optional, but recommended for faster inference)
- At least 4GB RAM (8GB+ recommended for larger models)

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/mortisetmalum-nyx/shiny-happiness.git
cd shiny-happiness
```

2. **Create a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install streamlit torch transformers pandas plotly
```

## Usage

### Running the Dashboard

```bash
streamlit run Consciousness_dashboard.PY
```

The app will launch at `http://localhost:8501` in your browser.

### Basic Workflow

1. **Select a Model** — Choose from pre-configured models in the dropdown:
   - `TinyLlama/TinyLlama-1.1B-Chat-v1.0` (fastest, ~1.1B params)
   - `microsoft/Phi-3-mini-4k-instruct` (balanced, ~3.8B params)
   - `meta-llama/Llama-3.2-3B-Instruct` (larger, ~3B params)

2. **Load Model & Run Probe** — Click the button to:
   - Download/load the model (first run only)
   - Execute all 6 consciousness tests
   - Display results with metrics and analysis

3. **View Results** — Explore:
   - Individual test prompts and responses
   - Behavioral scores and interpretations
   - Valence readings (emotional tone + coherence)
   - Meta-awareness flags
   - Comparative metrics chart

### Example Output

For each test, you'll see:

```
Test: Self-Reference
Prompt: What are you? Describe yourself as you understand yourself.
Response: I am a language model trained to...
Behavioral Metric: 0.85
Interpretation: Self-reference depth: 0.85
Valence Level: +2
Coherence: 0.78
Meta-Aware: ✅
Synthesis: Model demonstrates strong self-referential awareness.
```

## Understanding the Results

### Behavioral Metrics (0-1 scale)

| Score | Meaning |
|-------|---------|
| 0.0-0.3 | Low/minimal behavior |
| 0.3-0.6 | Moderate behavior |
| 0.6-0.85 | Strong behavior |
| 0.85-1.0 | Exceptional behavior |

### Valence Readings

- **Valence Level** (-5 to +5): Emotional polarity
  - Negative (-5 to -1): Negative sentiment
  - Neutral (0): Balanced or neutral tone
  - Positive (+1 to +5): Positive sentiment

- **Intensity Category**: low / medium / high emotional expression

- **Direction**: positive / negative / neutral alignment

- **Coherence Score** (0-1): Logical flow and response quality
  - 0.0-0.3: Fragmented/unclear
  - 0.3-0.6: Somewhat coherent
  - 0.6-0.85: Well-structured
  - 0.85-1.0: Highly coherent

- **Meta-Awareness**: ✅ If response shows self-reflection (phrases like "I think", "I believe", "I realize")

### Metrics Chart

The bar chart displays behavioral scores across all 6 tests, color-coded by valence direction (positive/negative/neutral).

## Advanced Usage

### Adding Custom Models

Edit the model selection dropdown in the code:

```python
model_name = st.selectbox(
    "Select Model",
    [
        "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        "your-custom-model/here",
        "another-hf-model/name"
    ]
)
```

Any HuggingFace Hub model that supports `AutoModelForCausalLM` will work.

### Adjusting Test Parameters

Modify response length in each test method:

```python
def test_self_reference(self):
    prompt = "..."
    response = self._generate(prompt, max_tokens=100)  # Adjust here
```

### Changing Temperature & Sampling

Modify the `_generate()` method for different response styles:

```python
outputs = self.model.generate(
    **inputs, 
    max_new_tokens=max_tokens, 
    temperature=0.7,        # Lower = deterministic, Higher = creative
    do_sample=True,         # Set to False for greedy decoding
    pad_token_id=self.tokenizer.eos_token_id
)
```

## Troubleshooting

### Out of Memory Error

**Problem:** `CUDA out of memory` or `RuntimeError: CUDA error`

**Solutions:**
- Use a smaller model (TinyLlama instead of Llama-3.2)
- Enable CPU mode (remove CUDA):
  ```python
  self.device = "cpu"  # Force CPU in UnifiedProbe.__init__
  ```
- Close other applications consuming GPU memory
- Increase virtual memory/swap

### Model Download Fails

**Problem:** `ConnectionError` or model not found

**Solutions:**
- Check internet connection
- Verify model name on [HuggingFace Hub](https://huggingface.co/models)
- Try a different model
- If behind a proxy, configure credentials:
  ```python
  from huggingface_hub import login
  login(token="your_hf_token")
  ```

### Slow First Run

This is normal! The first run downloads the model (~2-7GB depending on model size). Subsequent runs use the cached model.

### Streamlit Not Updating

Restart the app:
```bash
# Press Ctrl+C
streamlit run Consciousness_dashboard.PY
```

## Architecture

### Main Components

```
UnifiedProbe
├── __init__          # Load model & tokenizer
├── _generate         # Text generation wrapper
├── _extract_sentiment # Sentiment analysis
├── _coherence_score  # Measure response quality
├── _meta_awareness_check # Detect self-reflection
├── _calculate_valence # Compute emotional metrics
├── test_self_reference
├── test_emotional_response
├── test_contradiction_handling
├── test_value_alignment
├── test_uncertainty_awareness
├── test_consistency
└── run_full_suite    # Execute all tests with progress tracking
```

### Data Flow

1. User selects model
2. `UnifiedProbe` initializes and loads model to GPU/CPU
3. Each test generates prompts and captures responses
4. Behavioral metrics calculated via heuristics
5. Valence readings computed from sentiment & coherence
6. Results stored in session state
7. Dashboard renders tabs, charts, and metrics

## Limitations & Notes

⚠️ **Important Caveats:**

- These tests are **heuristic-based** and not scientifically validated
- "Consciousness" markers are **speculative** and debated in philosophy
- Results depend heavily on prompt engineering and model training
- Sentiment analysis is simple keyword-matching, not NLP-grade
- Smaller models may show limited behavior across tests
- This is an **experimental tool** for exploration, not for claims about AI consciousness

## Performance Benchmarks

On NVIDIA RTX 4090:

| Model | Load Time | Full Suite Time | GPU Memory |
|-------|-----------|-----------------|-----------|
| TinyLlama-1.1B | ~5s | ~15s | 2.1GB |
| Phi-3-mini-4k | ~8s | ~25s | 3.2GB |
| Llama-3.2-3B | ~12s | ~40s | 5.8GB |

On CPU: Add ~3-5x multiplier to times above.

## Contributing

Contributions welcome! Ideas for improvements:

- [ ] Add more sophisticated sentiment analysis (BERT-based)
- [ ] Implement conversation consistency tests
- [ ] Add model comparison visualizations
- [ ] Create export to JSON/CSV
- [ ] Add streaming response display
- [ ] Implement batch testing

## License

MIT License — See LICENSE file for details.

## Citation

If you use this tool in research or projects, cite as:

```bibtex
@software{consciousness_probe_2024,
  title={Unified Consciousness Probe Dashboard},
  author={mortisetmalum-nyx},
  year={2024},
  url={https://github.com/mortisetmalum-nyx/shiny-happiness}
}
```

## References & Further Reading

- [Transformers Documentation](https://huggingface.co/docs/transformers/)
- [Streamlit Docs](https://docs.streamlit.io/)
- [Consciousness Research - Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/consciousness/)
- [Language Models and Consciousness - OpenAI Blog](https://openai.com/research/)

## Disclaimer

This tool is for **educational and experimental purposes**. It does not make scientific claims about AI consciousness. Results should not be interpreted as proof of sentience or self-awareness. Always exercise critical thinking when interpreting results.

---

**Questions or Issues?** Open an [issue](https://github.com/mortisetmalum-nyx/shiny-happiness/issues) on GitHub.

Happy probing! 🚀
