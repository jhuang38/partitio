FROM python:3.9.7

RUN apt-get -y update
RUN apt-get -y install git

WORKDIR /app

COPY . .

RUN pip install --upgrade setuptools


RUN ls

RUN ["python", "setup.py", "install"]


CMD ["bash", "./scripts/docker_entrypoint.sh"]