import whisper
import sys
import os

absDir = os.path.dirname(os.path.abspath(__file__))

model = whisper.load_model(sys.argv[3])
result = model.transcribe(audio=sys.argv[1], language=sys.argv[2])
print(result["text"])

path = f'{absDir}/{sys.argv[4]}.tmp'

with open(path, mode='w', encoding='UTF-8') as f:
    f.write(result["text"])
