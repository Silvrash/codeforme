# CodeForMe - semantic parsing to {python} code

This project uses the CoNaLa corpus dataset which can be downloaded from http://www.phontron.com/download/conala-corpus-v1.1.zip

It seeks mainly to make the life of a programmer easier to migrate from one language to another(python in this case).
It fulfills the requirement of migration from one language to python programming language using natural language as commands

**Online demo**: https://codeforme.herokuapp.com/

**First install the requirements**

`pip install -r requirements.txt`

**To start the flask server run**

`python main.py`

**Once the server has started, run this command to build the react ui**
`npm start`


**Visit** http://localhost:14000 


**For an interative session,**
`python -m engine.interactive`

# References
`@inproceedings{yin2018mining,
  author = {Yin, Pengcheng and Deng, Bowen and Chen, Edgar and Vasilescu, Bogdan and Neubig, Graham},
  title = {Learning to Mine Aligned Code and Natural Language Pairs from Stack Overflow},
  booktitle = {International Conference on Mining Software Repositories},
  series = {MSR},
  pages = {476--486},
  year = {2018},
  publisher = {ACM},
  doi = {https://doi.org/10.1145/3196398.3196408},
}`
