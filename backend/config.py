from fastapi import FastAPI

app = FastAPI()
chunk_length_s = 30
stride_length_s = (5, 5)  # Left and right stride for overlapping chunks

# Processor and model will be initialized in main.py 