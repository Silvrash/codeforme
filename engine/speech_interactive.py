"""Interactive session with speech to text"""

import speech_recognition as sr
from .test import PyBot
import json

pybot = PyBot()

while True: 
    # use the audio file as the audio source
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print('Say something: ')
        audio = r.listen(source)

    # recognize speech using Google Cloud Speech
    try:
        response = r.recognize_google(audio)
        print('Query: %s' %response)
        predictions = pybot.predict(response)
        
        print('Found %s results\n%s' %(len(predictions), json.dumps(predictions, indent=1)))

    except sr.UnknownValueError:
        print("Google Cloud Speech could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Cloud Speech service; {0}".format(e))
