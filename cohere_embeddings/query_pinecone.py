import pandas as pd
from pinecone_task import embed, pinecone_init, chunks, gen_batch, PINECONE_G
from pinecone_pdf import PINECONE_V
import cohere
import pinecone
from cohere_client import launch_cohere_chatbot, launch_cohere_chatbot_with_pdf_context, query_pinecone, embed_single, launch_generic_chatbot




if __name__ == "__main__":
    class_index = pinecone_init("teddy", PINECONE_G)
    content_index = pinecone_init("content", PINECONE_V)
    top_k = 5
    res = query_pinecone(class_index, "What are your thoughts on math?", top_k=top_k)
    num_def = [x["metadata"]['Task'] for x in res.matches].count("Default")
    age = 5
    name = "Arnav"
    learning_goals = ['science', 'US History', 'Scratch Coding']
    if num_def / top_k > 0.5:
        print("Default")
        launch_generic_chatbot(age, name, learning_goals, class_index, content_index, None)
    else:
        context_k = 5
        res = query_pinecone(content_index, "Can you summarize the content in the pdf?", top_k=context_k)
        pdf_context = [x[1] for x in sorted([(x['id'], x["metadata"]['Context']) for x in res.matches])]
        launch_generic_chatbot(age, name, learning_goals, class_index, content_index, pdf_context)
        print("PDF")