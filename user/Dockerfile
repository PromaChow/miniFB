FROM python:3.9
RUN pip3 install pipenv

COPY ./Authentication /app/src
COPY ./requirements.txt /app
RUN cd /app && pipenv install
RUN cd  /app && pipenv install --system
WORKDIR /app
ENV PYTHONPATH "/app/src"
RUN pipenv install -r requirements.txt

CMD [ "uvicorn", "src.main:app","--reload", "--host=0.0.0.0", "--port=8000"]

