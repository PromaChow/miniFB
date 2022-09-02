FROM python:3.9
RUN pip3 install pipenv

COPY ./Authentication /app/src
COPY ./requirements.txt /app
RUN cd /app && pipenv install
RUN cd  /app && pipenv install --system
WORKDIR /app

RUN pip3 install -r requirements.txt

CMD [ "uvicorn", "src.main:app","--reload", "--host=127.0.0.1", "--port=8000"]