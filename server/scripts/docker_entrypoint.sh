#! /bin/bash
gunicorn --config=./configs/gunicorn.conf.py main:app