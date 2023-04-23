import pvporcupine
from pvrecorder import PvRecorder

# keywords = ['picovoice', 'bumblebee', 'awesome']
keywords = ['hey teddy']
porcupine = pvporcupine.create(
  access_key='2gswBAKLbrVawQqJ8TzK5l772av6VXbqHvz0D9Nz2+KOBKB6kBxy6w==',
  keyword_paths=['HeyTeddyRasp/Hey-Teddy_en_raspberry-pi_v2_2_0.ppn']
)

# porcupine = pvporcupine.create(access_key=access_key, keywords=keywords)
recoder = PvRecorder(device_index=-1, frame_length=porcupine.frame_length)

try:
    recoder.start()

    while True:
        keyword_index = porcupine.process(recoder.read())
        if keyword_index >= 0:
            print(f"Detected {keywords[keyword_index]}")

except KeyboardInterrupt:
    recoder.stop()
finally:
    porcupine.delete()
    recoder.delete()
