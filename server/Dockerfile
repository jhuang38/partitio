FROM python:3.10.1

WORKDIR /app

COPY . .

RUN ["python", "setup.py", "install"]

CMD ["bash", "./scripts/docker_entrypoint.sh"]