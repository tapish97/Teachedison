FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt /code/
RUN apt-get update && apt-get install -y netcat-openbsd \
    && pip install --no-cache-dir -r requirements.txt


COPY . /code/
