import cohere
import pandas as pd
api_key = "LgXZaogrwPAluYs3MxwcuyjPlsTF5A3bo9EzwXnf"
df = pd.read_csv('embeddings.csv')
text_to_embed = df['Sentence'].tolist()
bot = cohere.Client(api_key=api_key)
texts = text_to_embed
res = bot.embed(texts = texts)
print(res)
# res = bot.embed(query = "Hello, world! This is my prompt. Hopefully it is long enough to be useful.")