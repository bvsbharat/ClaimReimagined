
# Claim Reimagined 🚗💥✨

**Claim insurance that reimagines reality.**

Claim Reimagined is a next-generation insurance adjuster dashboard that leverages Google's **Gemini Multimodal AI** to transform raw text descriptions (FNOL - First Notice of Loss) into visual truths.

Instead of reading through dense paragraphs of accident descriptions, adjusters are presented with instant, AI-generated visual reconstructions of the scene, damage analysis, and synthetic evidence photos, drastically reducing claim review time.

---

## 🚩 The Problem

Insurance claim processing is historically a manual, text-heavy, and mentally taxing process.

- **Cognitive Overload:** Adjusters spend hours deciphering dense, inconsistent, and often emotional narratives in First Notice of Loss (FNOL) reports.
- **Subjective Visualization:** Reconstructing the accident scene relies entirely on the adjuster's mental imagination, leading to subjective interpretations and inconsistencies across the team.
- **Evidence Gaps:** Initial reports often lack clear photos. Adjusters must make preliminary decisions based solely on text, or wait days for visual evidence to arrive.
- **Efficiency Bottlenecks:** The disconnect between the text narrative and visual reality slows down the approval/rejection lifecycle, frustrating customers and increasing operational costs.

## 💡 The Solution

**Claim Reimagined** bridges the gap between text and visual reality using Generative AI.

1.  **Instant Visual Validation:** By converting the FNOL text directly into a 3D scene visualization, adjusters can immediately "see" the claimant's narrative. If the generated scene looks physically impossible or inconsistent with the laws of traffic, it raises an immediate flag.
2.  **Synthetic Evidence Baselines:** The app generates "expected" evidence photos based on the description. This provides a baseline truth: *"This is what a 2022 Camry backing into a concrete pillar at 5mph SHOULD look like."* Adjusters can compare this against actual user uploads to detect exaggeration or fraud.
3.  **Automated Triage:** Computer Vision (Gemini Flash) automatically scans the visualizations to detect, label, and box damage. This acts as an automated second pair of eyes, ensuring no detail in the visual reconstruction is missed.
4.  **Contextual Unification:** By bringing maps, weather data, vehicle telemetry, and AI visualizations into a single view, the cognitive load is drastically reduced, allowing adjusters to focus on decision-making rather than data aggregation.

---

## 🌟 Key Features

### 1. AI Scene Reconstruction
Transforms text data (Vehicle info, Time, Weather, Description) into a high-fidelity visualization.
- **Powered by:** `gemini-3-pro-image-preview`
- **View Modes:**
  - **Isometric 3D:** A clean, studio-like clay render for structural analysis.
  - **Aerial Drone:** A top-down realistic view of the environment.
  - **2D Schematic:** An architectural blueprint style highlighting impact zones (Hot Pink).
  - **Street Level:** A dashcam-style perspective.

### 2. Synthetic Evidence Generation
Simulates the "User Uploaded Evidence" experience by generating realistic photos of the specific car and damage described in the claim.
- **Powered by:** `gemini-2.5-flash-image`
- **Functionality:** Automatically generates 4 distinct angles (Close-up, Wide, Side, POV) on dashboard load.

### 3. Automated Damage Detection
Analyzes the visual scene to identify and label specific areas of damage.
- **Powered by:** `gemini-2.5-flash` (Vision capabilities)
- **Functionality:** Returns bounding box coordinates (`ymin`, `xmin`, `ymax`, `xmax`) which are overlaid on the generated scene as interactive SVGs.

### 4. Smart Context Widgets
- **FNOL Editor:** View and edit the raw transcript; edits trigger scene regeneration.
- **Interactive Map:** Visualizes location data.
- **Coverage & Specs:** Detailed breakdown of policy limits and vehicle telemetry.

---

## 🛠 Tech Stack

- **Frontend Framework:** React 18 (TypeScript)
- **AI SDK:** Google GenAI SDK (`@google/genai`)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tooling:** Vite (implied structure)

---

## 🧠 How It Works

### The Data Flow
1.  **Input:** The app starts with structured mock data (`constants.tsx`) representing a claim (FNOL text, car details, weather).
2.  **Prompt Engineering:**
    - The `SceneViewer` component constructs a complex JSON-like prompt injection.
    - It combines the vehicle's year/make/model, the specific damage description (e.g., "shattered tail light"), and environmental context (rainy, night).
    - It appends artistic style instructions based on the selected **View Mode**.
3.  **Generation:**
    - The `geminiService.ts` sends this prompt to the Gemini API.
    - The API returns a base64 encoded image.
4.  **Analysis Loop:**
    - Once the scene is generated, the image is sent back to Gemini Flash with a prompt to "Identify distinct areas of damage."
    - The model returns a JSON array of bounding boxes.
    - These boxes are rendered as clickable overlays on the dashboard.

---

## 🚀 Getting Started

### Prerequisites
- A Google Cloud Project with the **Gemini API** enabled.
- An API Key with billing enabled (required for `gemini-3-pro-image-preview`).

### Installation

1.  **Clone the repository**
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Run the development server**
    ```bash
    npm start
    # or
    npm run dev
    ```

### API Key Setup
The application includes a built-in mechanism to request an API key via the `window.aistudio` interface if available, or looks for `process.env.API_KEY`.
- When running locally, ensure you have your key ready. The app will prompt you to select/input it if not detected.

---

## 📂 Project Structure

- **`/pages`**: Top-level views (Landing Page, Claims List, Dashboard).
- **`/components`**:
  - `SceneViewer`: Core component handling 3D generation and SVG overlays.
  - `InfoWidgets`: Contextual data cards (People, Maps, Evidence).
  - `TicketCard`: The styled card used in the claims list.
- **`/services`**:
  - `geminiService.ts`: Direct interface with Google GenAI SDK.
  - `imageStore.ts`: In-memory caching to prevent re-generating images on navigation.
- **`/types`**: TypeScript interfaces for Claims, People, and Damage Regions.

---

## 🎨 Design System

The app uses a "Clean Tech" aesthetic:
- **Primary Color:** Hot Pink (`#ff0083`) for actions and damage highlights.
- **Typography:** *Outfit* for UI text, *Libre Baskerville* for headings, *Pacifico* for the logo.
- **Glassmorphism:** Used in overlay controls on the scene viewer.
