FROM python:3.8

WORKDIR /usr/src/app

COPY . .

RUN pip pip install -r requirements.txt

RUN ["chmod", "+x", "wait-for"]
RUN mv wait-for /bin/wait-for

RUN ["python", 'manage.py', "loaddata initialdata.json"]

EXPOSE 8000
CMD [ "gunicorn", "profielp.wsgi", "0:8000" ]