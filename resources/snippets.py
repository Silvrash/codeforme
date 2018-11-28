from flask_restful import Resource
from flask_socketio import emit
from flask import request
from engine.test import PyBot
from services.speech_rec_service import SpeechToText
import subprocess
import os


class Snippets(Resource):
    pybot = PyBot()
    sr = SpeechToText()

    def get(self, intent):
        predictions = self.pybot.predict(intent)
        return {'data': predictions}

    @staticmethod
    def textToIntents(data):
        predictions = Snippets.pybot.predict(data['intent'])
        emit('onPredict', {'predictions': predictions,
                           'intent': data['intent']})

    @staticmethod
    def speechToIntents(data):
        session_path = os.path.normpath(os.path.join(os.path.dirname(__file__),os.pardir, 'files/{}'.format(request.sid)))
        if not os.path.exists(session_path):
            os.mkdir(session_path)

        webm_path = os.path.join(session_path, 'audio.webm')
        wave_path = os.path.join(session_path, 'audio_wav.wav')

        if data:
            with open(webm_path, 'ab') as f:
                if data.get('size'):
                    f.seek(data['size'])
                f.write(data['blob'])

            command = 'ffmpeg -y -i "{}" -vn "{}"'.format(webm_path, wave_path)

            subprocess.call(command, shell=True)
            

            text = Snippets.sr.stt(wave_path)
            if text:
                emit('stt', {'text': text})
            
            if os.path.exists(webm_path):
                os.remove(webm_path)
            if os.path.exists(wave_path):
                os.remove(wave_path)


    @staticmethod
    def onConnect():
        print('%s connected' % (request.sid))