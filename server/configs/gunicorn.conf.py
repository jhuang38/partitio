import os

bind = f"0.0.0.0:{os.environ.get('SERVER_PORT')}"
reload = True
worker_class = 'eventlet'
accesslog = '-'
errorlog = '-'
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
port = os.environ.get('SERVER_PORT')