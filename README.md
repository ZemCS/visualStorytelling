# Visual Storytelling Application

This repository contains a Visual Storytelling application that generates stories based on user-uploaded images and text prompts. The application uses a Flask backend with machine learning models (BLIP and LLaMA 2) to generate stories and a React frontend for the user interface.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Upload an image and provide a text prompt to generate a unique story.
- Display generated stories with a typewriter effect.
- Summarize generated stories using a BART model.
- Responsive and user-friendly interface.
- Backend API for story generation and summarization.

## Technologies
- **Backend**:
  - Python 3.8+
  - Flask
  - PyTorch
  - Transformers (Hugging Face)
  - LLaMA 2 (via llama_cpp)
  - BLIP (for image captioning)
  - BART (for text summarization)
- **Frontend**:
  - React
  - JavaScript (- **Other**:
  - Git
  - GitHub

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js and npm
- Git

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/visual-storytelling.git
   cd visual-storytelling
   ```

2. **Backend Setup**:
   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install backend dependencies:
     ```bash
     pip install -r backend/requirements.txt
     ```
   - Ensure the BLIP model is placed in `backend/model/blip-vist-finetuned`. You can download or fine-tune it from Hugging Face.
   - The LLaMA 2 model (`llama-2-7b-chat.Q4_K_M.gguf`) will be downloaded automatically on the first run, or you can manually download it from [Hugging Face](https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF).

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```

4. **Environment Configuration**:
   - Ensure the `uploads` folder exists in the `backend` directory or is created automatically by the application.

## Usage

1. **Run the Backend**:
   - From the `backend` directory, start the Flask server:
     ```bash
     python app.py
     ```
   - The backend will run on `http://localhost:5000`.

2. **Run the Frontend**:
   - From the `frontend` directory, start the React development server:
     ```bash
     npm start
     ```
   - The frontend will run on `http://localhost:3000`.

3. **Access the Application**:
   - Open `http://localhost:3000` in your browser.
   - Upload an image, enter a prompt, and click "Generate Story" to create a story.
   - Use the "Summarize" button to view a summarized version of the story.

## Project Structure
```
visual-storytelling/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── model/             # Directory for BLIP model
│   ├── uploads/           # Directory for uploaded images
│   ├── requirements.txt    # Backend dependencies
│   └── llama-2-7b-chat.Q4_K_M.gguf  # LLaMA 2 model (downloaded)
├── frontend/
│   ├── src/
│   │   └── VisualStorytelling.js  # Main React component
│   ├── public/            # Static assets
│   ├── package.json        # Frontend dependencies
│   └── README.md          # Frontend-specific readme (if any)
└── README.md              # This file
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
