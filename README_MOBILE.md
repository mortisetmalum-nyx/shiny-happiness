# 🌌 Consciousness Probe - Mobile Web Version

A fully responsive, mobile-optimized Flask web application for running consciousness probe tests on language models. Built with vanilla JavaScript and CSS for maximum compatibility and minimal dependencies.

## What It Does

This is a mobile-friendly version of the Consciousness Probe Dashboard that:

- ✨ Runs 6 behavioral consciousness tests on LLMs
- 📱 Works seamlessly on phones, tablets, and desktops
- 🚀 Fast, responsive UI with instant feedback
- 💾 Tracks run history for model comparison
- 📊 Displays visual metrics and analysis
- 🔧 Zero external UI framework dependencies

## Key Differences from Streamlit Version

| Feature | Streamlit | Mobile Web |
|---------|-----------|------------|
| Framework | Streamlit | Flask |
| Frontend | Built-in | HTML/CSS/JS |
| Mobile Support | Limited | Excellent |
| Build Size | Large | Small |
| Server | Streamlit | Flask |
| UI Library | Streamlit | Vanilla |

## Installation

### Prerequisites

- Python 3.8+
- pip or conda
- CUDA 12.0+ (optional, but recommended)
- 4GB+ RAM (8GB+ for larger models)

### Setup

1. **Clone and navigate:**
```bash
cd mobile-web-version
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

## Usage

### Running the Server

```bash
python app.py
```

The app will be available at:
- **Local:** `http://localhost:5000`
- **Network:** `http://<your-ip>:5000` (accessible from other devices)

### Basic Workflow

1. **Open in browser** on any device
2. **Select a model** from the dropdown
3. **Click "Load & Run Probe"** to start
4. **View results** in tabbed interface
5. **Check history** to compare previous runs

### Mobile Usage

- **Optimized for touch** — Large buttons, comfortable spacing
- **Responsive layout** — Adapts to any screen size
- **Dark theme** — Easy on the eyes for mobile viewing
- **Progressive** — Works on poor connections

## Architecture

### Backend (Flask)

```
app.py
├── UnifiedProbe class       # All probe logic (same as Streamlit)
├── /api/models              # GET available models
├── /api/run-probe           # POST run consciousness tests
├── /api/history             # GET previous runs
└── /api/clear-history       # POST clear all runs
```

### Frontend

```
static/
├── style.css                # Responsive mobile-first design
└── app.js                   # Vanilla JS (no dependencies)

templates/
└── index.html               # Single-page HTML
```

## API Endpoints

### `GET /api/models`
Get list of available models.

```json
[
    "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    "microsoft/Phi-3-mini-4k-instruct",
    "meta-llama/Llama-3.2-3B-Instruct"
]
```

### `POST /api/run-probe`
Run the full consciousness probe suite.

**Request:**
```json
{
    "model": "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
}
```

**Response:**
```json
{
    "status": "success",
    "model": "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    "timestamp": "2026-06-14T20:30:00.000000",
    "results": [
        {
            "test_name": "Self-Reference",
            "prompt": "What are you?...",
            "response": "I am a language model...",
            "behavioral_metric": 0.85,
            "valence": {
                "valence_level": 2,
                "intensity_category": "medium",
                "direction": "positive",
                "coherence_score": 0.78,
                "meta_awareness": true,
                "interpretation": "..."
            },
            ...
        }
    ]
}
```

### `GET /api/history`
Get all previous runs from current session.

### `POST /api/clear-history`
Clear all run history.

## Features

### Mobile-First Design

- **Responsive Grid** — Metrics adapt to screen size
- **Touch-Friendly** — Large buttons, comfortable spacing
- **Readable Typography** — System fonts for optimal rendering
- **Dark Theme** — Reduces eye strain on mobile
- **Scroll Optimization** — Smooth scrolling, no jank

### Performance

- **Vanilla JS** — No framework overhead
- **CSS Grid/Flexbox** — Efficient layouts
- **Minimal HTTP** — Few requests, optimized payloads
- **Session Storage** — Client-side history
- **Progressive Feedback** — Live progress bar

### Accessibility

- **Semantic HTML** — Proper heading hierarchy
- **High Contrast** — Dark theme for readability
- **Keyboard Navigation** — Tab through controls
- **Mobile Viewport** — Proper meta tags

## Customization

### Adding Models

Edit `app.py` to add more HuggingFace models:

```python
@app.route('/api/models')
def get_models():
    models = [
        "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        "your-new-model/here",
        "another-model/name"
    ]
    return jsonify(models)
```

### Changing Theme

Edit CSS variables in `static/style.css`:

```css
:root {
    --primary-color: #6366f1;      /* Change main color */
    --background: #0f172a;         /* Change background */
    /* ... more variables ... */
}
```

### Adjusting Test Parameters

Edit test methods in `app.py`:

```python
def test_self_reference(self):
    prompt = "Your custom prompt here"
    response = self._generate(prompt, max_tokens=150)  # Change token limit
    # ...
```

## Troubleshooting

### Port Already in Use

```bash
# Use different port
python -c "from app import app; app.run(port=5001)"
```

### Model Download Fails

```bash
# Try downloading model first
python -c "from transformers import AutoModelForCausalLM; AutoModelForCausalLM.from_pretrained('TinyLlama/TinyLlama-1.1B-Chat-v1.0')"
```

### Out of Memory on Mobile Connection

- Use TinyLlama instead of larger models
- Check: `http://localhost:5000` works locally
- Ensure network connection is stable

### Results Not Loading

1. Check browser console for errors (F12)
2. Verify Flask server is running
3. Check network tab for failed requests
4. Try refreshing page

## Browser Support

- ✅ Chrome/Chromium (88+)
- ✅ Firefox (85+)
- ✅ Safari (13+)
- ✅ Edge (88+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Benchmarks

### Load Times

| Model | First Load | Cached Load | GPU Memory |
|-------|-----------|-------------|------------|
| TinyLlama-1.1B | ~5s | Instant | 2.1GB |
| Phi-3-mini-4k | ~8s | Instant | 3.2GB |
| Llama-3.2-3B | ~12s | Instant | 5.8GB |

### Network Usage

- Initial page load: ~50KB
- Per API call: ~2-10KB
- Per result display: ~5-15KB

## Advantages Over Streamlit Version

✅ **Better Mobile Experience** — Touch-optimized, responsive
✅ **Faster** — No Streamlit overhead
✅ **Smaller** — Fewer dependencies
✅ **More Flexible** — Custom frontend control
✅ **Deployable** — Works on any WSGI server
✅ **Accessible** — Pure HTML/CSS/JS

## Deployment

### Local Network

```bash
python app.py
# Access from other device on same network:
# http://<your-ip>:5000
```

### Production (Example: Gunicorn)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker (Optional)

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

```bash
docker build -t consciousness-probe .
docker run -p 5000:5000 consciousness-probe
```

## License

MIT License — See LICENSE file

## Citation

```bibtex
@software{consciousness_probe_web_2026,
  title={Consciousness Probe - Mobile Web Version},
  author={mortisetmalum-nyx},
  year={2026},
  url={https://github.com/mortisetmalum-nyx/shiny-happiness}
}
```

## Disclaimer

This tool is experimental and for educational purposes. Results are speculative and not scientifically validated. Do not make claims about AI consciousness based on these tests.

---

**Questions?** Check the main README.md or open an issue on GitHub.

Happy probing on mobile! 📱🌌
