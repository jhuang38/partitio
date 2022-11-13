FROM postgres:14


RUN apt-get update && \
    apt-get remove --purge -y python3 && \
    apt-get -y install sudo && \
    sudo apt-get -y install python3 pip libpq-dev

RUN python3 -V

WORKDIR /app

COPY . .
# RUN pip install alembic 1.8.1
RUN python3 setup.py install

RUN cd models && alembic upgrade head