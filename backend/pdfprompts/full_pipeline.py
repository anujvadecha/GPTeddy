from cohere_client import launch_cohere_chatbot, query_pinecone, launch_generic_chatbot
import pvporcupine
from pvrecorder import PvRecorder
from pinecone_task import embed, pinecone_init, chunks, gen_batch, PINECONE_G
from pinecone_pdf import PINECONE_V


# keywords = ['picovoice', 'bumblebee', 'awesome']
keywords = ['hey teddy']
porcupine = pvporcupine.create(
  access_key='2gswBAKLbrVawQqJ8TzK5l772av6VXbqHvz0D9Nz2+KOBKB6kBxy6w==',
  keyword_paths=['HeyTeddy/Hey-Teddy_en_mac_v2_2_0.ppn']
)

# porcupine = pvporcupine.create(access_key=access_key, keywords=keywords)
recoder = PvRecorder(device_index=-1, frame_length=porcupine.frame_length)

print('starting porcupine')
try:
    recoder.start()
    while True:
        # print(recoder.read())
        keyword_index = porcupine.process(recoder.read())
        if keyword_index >= 0:
            recoder.stop()
            class_index = pinecone_init('teddy', PINECONE_G)
            context_index = pinecone_init('content', PINECONE_V)
            top_k = 5
            res = query_pinecone(class_index, "Hi Teddy!", top_k)
            num_def = [x['metadate']['Task'] for x in res.matches].count("Default")

            print(f"Detected {keywords[keyword_index]}")
            age = 5
            name = "Arnav"
            learning_goals = ['science', 'US History', 'Scratch Coding']
            if num_def / top_k > 0.5:
                launch_generic_chatbot(age, name, learning_goals, class_index, context_index, None)
            else:
                context_k = 5
                pdf_context = [x[1] for x in sorted([(x['id'], x["metadata"]['Context']) for x in res.matches])]
                launch_generic_chatbot(age, name, learning_goals, class_index, context_index, pdf_context)
                print("PDF")
        recoder.start()


except KeyboardInterrupt:
    recoder.stop()
finally:
    porcupine.delete()
    recoder.delete()
