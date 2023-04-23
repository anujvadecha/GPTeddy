from cohere_client import launch_cohere_chatbot
import pvporcupine
from pvrecorder import PvRecorder

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
            print(f"Detected {keywords[keyword_index]}")
            # TODO (akgarg) query from the database
            age = 5
            name = "Arnav"
            learning_goals = ['science', 'US History', 'Scratch Coding']
            launch_cohere_chatbot(age, name, learning_goals)
        recoder.start()


except KeyboardInterrupt:
    recoder.stop()
finally:
    porcupine.delete()
    recoder.delete()
