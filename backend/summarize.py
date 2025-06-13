# summarize.py
# Module for on-demand summarization of transcribed text

import logging
from transformers import pipeline
import torch
import re
from typing import List

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Determine device (use GPU if available, otherwise CPU)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
logger.info(f"Using device: {device}")

# Initialize the summarization pipeline with mBART
summarizer = pipeline('summarization', model='facebook/mbart-large-50', device=device)

def chunk_text(text: str, max_chunk_length: int = 800) -> List[str]:
    """
    Split text into chunks of approximately equal length, trying to break at sentence boundaries.
    
    Args:
        text (str): The text to split into chunks
        max_chunk_length (int): Maximum number of words per chunk
    
    Returns:
        List[str]: List of text chunks
    """
    # Split text into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        sentence_length = len(sentence.split())
        
        if current_length + sentence_length > max_chunk_length and current_chunk:
            # Join current chunk and add to chunks
            chunks.append(' '.join(current_chunk))
            current_chunk = [sentence]
            current_length = sentence_length
        else:
            current_chunk.append(sentence)
            current_length += sentence_length
    
    # Add the last chunk if it's not empty
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks

def summarize_text(text: str, max_length: int = 250, min_length: int = 50, do_sample: bool = False, 
                  num_beams: int = 6, length_penalty: float = 1.2) -> str:
    """
    Summarize the given text using the mBART model.
    Handles long texts by chunking and summarizing each chunk, then combining the summaries.

    Args:
        text (str): The text to summarize
        max_length (int): Maximum length of the summary in tokens
        min_length (int): Minimum length of the summary in tokens
        do_sample (bool): Whether to sample or use greedy decoding
        num_beams (int): Number of beams for beam search
        length_penalty (float): Penalty to encourage longer summaries

    Returns:
        str: The summarized text
    """
    try:
        # Add a neutral prompt for summarization
        prompt = "Summarize the following text concisely, including key details: "
        
        # Split text into chunks if it's too long
        chunks = chunk_text(text)
        logger.info(f"Split text into {len(chunks)} chunks")
        
        summaries = []
        for i, chunk in enumerate(chunks):
            logger.info(f"Processing chunk {i+1}/{len(chunks)}")
            input_text = prompt + chunk
            
            # Adjust max_length for each chunk based on its length
            chunk_length = len(chunk.split())
            adjusted_max_length = min(max_length, max(chunk_length // 2, min_length))
            
            # Generate summary for this chunk
            chunk_summary = summarizer(
                input_text,
                max_length=adjusted_max_length,
                min_length=min_length,
                do_sample=do_sample,
                num_beams=num_beams,
                length_penalty=length_penalty,
                truncation=True
            )[0]['summary_text']
            
            # Remove prompt and clean up
            chunk_summary = chunk_summary.replace(prompt, '').strip()
            summaries.append(chunk_summary)
        
        # If we have multiple chunks, summarize the combined summaries
        if len(summaries) > 1:
            logger.info("Summarizing combined chunk summaries")
            combined_summaries = ' '.join(summaries)
            final_input = prompt + combined_summaries
            
            final_summary = summarizer(
                final_input,
                max_length=max_length,
                min_length=min_length,
                do_sample=do_sample,
                num_beams=num_beams,
                length_penalty=length_penalty,
                truncation=True
            )[0]['summary_text']
            
            final_summary = final_summary.replace(prompt, '').strip()
        else:
            final_summary = summaries[0]
        
        # Ensure summary ends with proper punctuation
        if not re.search(r'[.!?]$', final_summary):
            final_summary += '.'
        
        return final_summary

    except Exception as e:
        logger.error(f"Error during summarization: {str(e)}")
        return "Error generating summary."

# Example usage with a sample text
if __name__ == "__main__":
    test_text = "This policy note addresses the challenge of maintaining non-discriminatory communication at a community dance battle event, inspired by the scenario depicted in the teaser for a short film. The event, a high-energy, competitive dance battle held in an urban community center on June 7, 2025, at 22:00, brings together diverse participants and spectators from various cultural, socioeconomic, and experiential backgrounds. The competitive nature of the event, combined with its informal and emotionally charged atmosphere, creates a space where non-discriminatory communication is particularly difficult to maintain. Dance battles often involve spontaneous verbal exchanges, such as trash-talking or commentary by emcees, which can unintentionally or deliberately veer into discriminatory territory (e.g., remarks based on gender, race, body type, or skill level). Social media interactions before and after the event, including posts on platforms like X, can amplify tensions by perpetuating stereotypes or mocking participants. The pressure to perform and the presence of a diverse audience heighten the risk of miscommunication or biased remarks, making this a complex environment for ensuring respectful dialogue."
    summary = summarize_text(test_text)
    print(f"Original text: {test_text}")
    print(f"Summary: {summary}") 