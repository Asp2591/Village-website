from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()

generator = pipeline("text-generation", model="mistralai/Mistral-7B-Instruct")

@app.get("/message")
def generate_message(name:str):

    prompt = f"Write a short birthday message for {name} who donated 100 rupees for village development."

    result = generator(prompt, max_length=40)

    return {"message": result[0]["generated_text"]}