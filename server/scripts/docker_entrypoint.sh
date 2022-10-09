#! /bin/bash
cd /app
pwd
gunicorn --config=./configs/gunicorn.conf.py main:app