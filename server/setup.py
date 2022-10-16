from setuptools import setup, find_packages

setup(
    name='partitio_flask',
    version='0.0.1',
    packages=find_packages(),
    install_requires=[
        "Flask==2.0.3",
        "Flask-SQLAlchemy==2.5.1",
        "psycopg2==2.9.3",
        "itsdangerous==2.1.1",
        "gunicorn==20.1.0",
        "requests==2.27.1",
        "flask-cors==3.0.10"
    ],
    python_requires="==3.10.1"
)