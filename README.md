Visual Storytelling Application
This repository contains a Visual Storytelling application that generates stories based on user-uploaded images and text prompts. The application uses a Flask backend with machine learning models (BLIP and LLaMA 2) to generate stories and a React frontend for the user interface.
Table of Contents

Features
Technologies
Installation
Usage
Project Structure
Contributing
License

Features

Upload an image and provide a text prompt to generate a unique story.
Display generated stories with a typewriter effect.
Summarize generated stories using a BART model.
Responsive and user-friendly interface.
Backend API for story generation and summarization.

Technologies

Backend:
Python 3.8+
Flask
PyTorch
Transformers (Hugging Face)
LLaMA 2 (via llama_cpp)
BLIP (for image captioning)
BART (for text summarization)


Frontend:
React
JavaScript (- Other:
Git
GitHub



Installation
Prerequisites

Python 3.8 or higher
Node.js and npm
Git

Steps

Clone the Repository:
git clone https://github.com/your-username/visual-storytelling.git
cd visual-storytelling


Backend Setup:

Create a virtual environment and activate it:python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install backend dependencies:pip install -r backend/requirements.txt


Ensure the BLIP model is placed in backend/model/blip-vist-finetuned. You can download or fine-tune it from Hugging Face.
The LLaMA 2 model (llama-2-7b-chat.Q4_K_M.gguf) will be downloaded automatically on the first run, or you can manually download it from Hugging Face.


Frontend Setup:

Navigate to the frontend directory:cd frontend


Install frontend dependencies:npm install




Environment Configuration:

Ensure the uploads folder exists in the backend directory or is created automatically by the application.



Usage

Run the Backend:

From the backend directory, start the Flask server:python app.py


The backend will run on http://localhost:5000.


Run the Frontend:

From the frontend directory, start the React development server:npm start


The frontend will run on http://localhost:3000.


Access the Application:

Open http://localhost:3000 in your browser.
Upload an image, enter a prompt, and click "Generate Story" to create a story.
Use the "Summarize" button to view a summarized version of the story.



Project Structure
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

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
