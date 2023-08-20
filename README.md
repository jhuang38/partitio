# partitio
## Description/Overview
A tab manager to help manage online resources. This application allows you to save URLs in collections, and share said collections with other users. Moreover, you can edit your collections with other collaboraters in real-time.
This project was made based on a suggestion from a friend. I initially made a prototype with Firebase as a backend, but I wanted to get more involved in developing some of the features for the final version of this project.
Don't ask where the name came from, I am honestly not sure what I was thinking when I came up with it.

The stack:
### Frontend
- React.js
- Redux (Toolkit)
- MaterialUI
- SocketIO Client
### Backend
- Flask (including additional libraries like flask-login & flask-socketio)
- SQLAlchemy + Alembic
- PostgreSQL
### Deployment
- Amazon EC2 instance
- nginx as a reverse proxy

To see the full list of dependencies, see `package.json` in client and `setup.py` in server and db.

## Demo
Looking to switch from AWS for deployment.

## Overall thoughts
Overall, I think this project turned out fairly well. I was able to apply lots of what I learned as a Software Dev at BMO to this project, including Docker, Flask, and Postgres. Moreover, it was exciting to implement features like the real-time editing and authentication, as I was able to actively see the things I was learning in action. However, I definitely think there is lots of room for improvement, which I will keep in mind with further work on this project and for my future projects.

## Running Locally
1. Pull this repo from github.com.
2. In the root folder, add a `.env` file and refer to the Environment Variables section below for setup.
3. Run `docker compose build` in order to build the client, server, and db containers.
4. Run `docker compose up -d server` in order to bring up the server and db.
5. (optional) You can run `docker compose up -d client` if you want to run the client in a docker container, personally I always just run the client with `npm start`.
6. From the root project folder, run `docker exec -it (db container name) bash`, then `cd models`, and `alembic upgrade head`. This will bring up all the necessary database tables.
7. You should see the page running on localhost:3000, you are free to change the ports where this application runs

## Running production build
1. Run `docker compose -f docker-compose.prod.yml build` to build all parts of the project.
2. Run `docker compose up -d` to run the application.
3. If you haven't already built the db container, bring up the database tables (see Running Locally for how).
4. You should be able to see the application on where you specified it (e.g localhost:3000).

## Environment Variables
- SERVER_PORT - port where server runs
- DB_URI - db uri, e.g. postgresql://(POSTGRES_USER):(POSTGRES_PASSWORD):5432/(database)
- FLASK_SECRET_KEY - secret key for application JWT tokens
- DB_PORT - port for db to run on
- POSTGRES_USER - database user
- POSTGRES_PASSWORD - database user password
- POSTGRES_DB - database

## Todos/Future Improvements/Features
### Frontend
- Integrate frontend components more with used libraries
    - use RTK query to create an API to interact with backend + socketio
- Replace current implementation in JS with TypeScript
- Enforce more of a separation between component logic and component views
- Create a more general component framework, e.g. one component for editing-type modal views
### Backend
- optimize login logic
- switch over to using OAUth 2.0 for authentication, current implementation is very simple JWT
- enforce more separation between views and business logic
- add feature to edit/delete accounts
- add email verification/password reset via flask-mail
### General
- Add more detailed documentation to minimize confusion as project gets bigger
- Overall work on cleaning up structure of application
- Get an SSL certificate from LetsEncrypt so site can be used with HTTPS properly (currently just stuck on login page)

