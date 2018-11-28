import speech_recognition as sr
import os


class SpeechToText(object):
    audio_sampling_rate = 48000

    def __init__(self):
        self.r = sr.Recognizer()
        
    def stt(self, path):
        # audio_data = sr.AudioData(stream, self.audio_sampling_rate, 2)
        with sr.AudioFile(path) as source:
            audio = self.r.record(source)
        try:
            text = self.r.recognize_google(audio)
            print(text)
            return text
        except sr.UnknownValueError:
            print("Google Cloud Speech could not understand audio")
        except sr.RequestError as e:
            print("Could not request results from Google Cloud Speech service; {0}".format(e))

if __name__ == '__main__':
    stt = SpeechToText()
    stt.stt('/home/ark/core-projects/python/pyBot/resources/audio_wav.wav')
# 
# AUDIO_FILE = os.path.join(os.path.dirname(os.path.realpath(__file__)), "english.wav")

# use the audio file as the audio source
# r = sr.Recognizer()
# with sr.AudioFile(AUDIO_FILE) as source:
#     audio = r.record(source)
# print(audio)
# # # recognize speech using Google Cloud Speech
# # try:
# #     #audio: file to be converted to text
# #     response = r.recognize_google(audio)
# #     # pybot = PyBot()
#     print(response)
# #     # predictions=pybot.predict(response)
# #     # print(predictions)
# # except sr.UnknownValueError:
# #     print("Google Cloud Speech could not understand audio")
# # except sr.RequestError as e:
# #     print("Could not request results from Google Cloud Speech service; {0}".format(e))
