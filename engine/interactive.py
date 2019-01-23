"""Interative session"""

from .test import PyBot
import json

pybot = PyBot()

while True:
    query = str(input('\nEnter query: '))
    if not query:
        print('Please enter query')
        continue

    predictions = pybot.predict(query)
    
    print('Found %s results\n%s' %(len(predictions), json.dumps(predictions, indent=1)))