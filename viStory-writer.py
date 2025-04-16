import os

import requests
import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from llama_cpp import Llama
from PIL import Image
from transformers import (
    AutoModelForSeq2SeqLM,
    AutoTokenizer,
    BlipForConditionalGeneration,
    BlipProcessor,
)
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

print("Loading BLIP model...")
blip_processor = BlipProcessor.from_pretrained(
    "C:\\Semester Work\\NLP\\model\\blip-vist-finetuned"
)
blip_model = BlipForConditionalGeneration.from_pretrained(
    "C:\\Semester Work\\NLP\\model\\blip-vist-finetuned",
    torch_dtype=torch.float32,
)

llama_model_name = "llama-2-7b-chat.Q4_K_M.gguf"
llama_model_url = "https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q4_K_M.gguf"

if not os.path.exists(llama_model_name):
    print("Downloading LLaMA 2...")
    response = requests.get(llama_model_url)
    with open(llama_model_name, "wb") as f:
        f.write(response.content)


class StoryGenerator:
    def __init__(self):
        self.blip_processor = blip_processor
        self.blip_model = blip_model
        self.llama = Llama(
            model_path=llama_model_name,
            n_gpu_layers=0,
            n_ctx=1024,
        )

    def generate(self, image_path, user_prompt):
        image = Image.open(image_path).convert("RGB")
        inputs = self.blip_processor(images=image, return_tensors="pt")
        story_outline = self.blip_model.generate(
            pixel_values=inputs.pixel_values,
            max_new_tokens=100,
        )
        outline_text = self.blip_processor.decode(
            story_outline[0], skip_special_tokens=True
        )

        system_prompt = f"""IMAGE CONTEXT: {outline_text}
        USER DIRECTIVE: {user_prompt}

        Follow these guide lines and write a story:
        - Begin IMMEDIATELY with the narrative without any preamble
        - Never use phrases like "Here is a story" or "Let me tell you"
        - Create a complete story with clear beginning, middle, and end
        - Conclude with a definitive ending that provides closure
        - Maintain exactly one paragraph under 200 tokens
        - Use proper literary conclusion phrases ("Finally", "In the end")
        - Use simple words and keep the story formal and do not use any emoticons
        Start generating immediately from the story, don't leave comments like: "Here is a story" or "Of course, here is what you asked for" or "Following your guidelines". Craft a vivid story that integrates both elements above:"""

        result = self.llama.create_chat_completion(
            messages=[{"role": "user", "content": system_prompt}],
            max_tokens=250,
            temperature=0.3,
            stop=["\n\n", "###"],
            top_p=0.9,
        )

        story = result["choices"][0]["message"]["content"]

        unwanted_intros = ["Sure,", "Certainly!", "Here", "Let me", "Of course"]
        for phrase in unwanted_intros:
            if story.startswith(phrase):
                story = story.split(" ", 1)[1]
                break

        story = story.strip()
        if not story.endswith((".", "!", "?")):
            if "." in story:
                story = story.rsplit(".", 1)[0] + "."
            else:
                story += "."

        return story


class StorySummarizer:
    def __init__(self):
        self.device = "cpu"
        self.model_name = "facebook/bart-large-cnn"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(self.model_name).to(
            self.device
        )

    def summarize(self, text):
        inputs = self.tokenizer(
            "summarize: " + text, return_tensors="pt", max_length=512, truncation=True
        ).to(self.device)
        summary_ids = self.model.generate(inputs.input_ids, max_length=150, num_beams=4)
        return self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)


story_gen = StoryGenerator()
summarizer = StorySummarizer()


@app.route("/generate-story", methods=["POST"])
def generate_story():
    if "image" not in request.files or "prompt" not in request.form:
        return jsonify({"error": "Image and prompt are required"}), 400

    image = request.files["image"]
    prompt = request.form["prompt"]

    if image.filename == "":
        return jsonify({"error": "No image selected"}), 400

    filename = secure_filename(image.filename)
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    image.save(image_path)

    try:
        story = story_gen.generate(image_path, prompt)
        summary = summarizer.summarize(story)
        os.remove(image_path)
        return jsonify({"story": story, "summary": summary})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
