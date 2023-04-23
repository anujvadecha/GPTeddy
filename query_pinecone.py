import pandas as pd
from pinecone_task import embed, pinecone_init, chunks, gen_batch
import cohere
import pinecone

def query_pinecone(index, query):
    embedddings = embed_single(query)
    res = index.query([embedddings], top_k=3, include_metadata=True)
    return res

def embed_single(x):
    api_key = "LgXZaogrwPAluYs3MxwcuyjPlsTF5A3bo9EzwXnf"
    bot = cohere.Client(api_key=api_key)
    res = bot.embed(texts = [x])
    return res.embeddings

def __main__():
    index = pinecone_init("teddy")
    res = query_pinecone(index, "Hello, world! This is my prompt. Hopefully it is long enough to be useful.")
    print(res)