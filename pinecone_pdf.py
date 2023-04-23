import os
import sys
import pandas as pd
import numpy as np

import pinecone
import openai

import argparse
import itertools
from datetime import datetime

import cohere

api_key = "LgXZaogrwPAluYs3MxwcuyjPlsTF5A3bo9EzwXnf"
PINECONE_V = "b98fa19a-b1ba-496f-a6f6-5fd486916f59"

# create a gitignore


def pinecone_init(ID):
    pinecone.init(
        api_key=PINECONE_V,
        environment="northamerica-northeast1-gcp"
    )

    if ID not in pinecone.list_indexes():
        print("index didn't exist")
        pinecone.create_index(ID, dimension=4096)
    else:
        pass
        # pinecone.Index(ID).delete(deleteAll='true')

    index = pinecone.Index(ID)

    return index


def embed(df):
    text_to_embed = df['Sentence'].tolist()
    bot = cohere.Client(api_key=api_key)
    texts = text_to_embed
    res = bot.embed(texts = texts)
    return res.embeddings

def chunks(iterable, batch_size=100):
    """A helper function to break an iterable into chunks of size batch_size."""
    it = iter(iterable)
    chunk = tuple(itertools.islice(it, batch_size))
    while chunk:
        yield chunk
        chunk = tuple(itertools.islice(it, batch_size))


def gen_batch(index, df):
    ids = []
    vectors = []
    metadata = []

    embedded_data = embed(df)

    for i in range(len(df)):
        ids.append(df.iloc[i].id)
        vectors.append(embedded_data[i])
        dict_obj = {
            "Sentence": df.iloc[i].Sentence,
            "Task": df.iloc[i].Task 
        }
        metadata.append(dict_obj)
    
    for ids_vectors_chunk in chunks(zip(ids, vectors, metadata), batch_size=25):
        index.upsert(vectors=ids_vectors_chunk)


if __name__ == "__main__":

    index = pinecone_init("teddy")
    df = pd.read_csv('embeddings.csv')
    df['id'] = df.index.astype(str)

    gen_batch(index, df)

