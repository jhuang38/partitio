# partitio
A tab manager for all your resource-sharing needs.

## Running Locally
1. Pull this repo from github.com
2. Run `docker-compose build` in order to build the client, server, and db containers



## TODOS
### Frontend
- switch from using Async thunks to use RTK query
- utilize MUI more
- move modal component logic to separate file, have other components with modals just use props to make modal work
- decouple ws logic from edit page component, integrate more with redux
- use typescript??? 
### Backend
- optimize login logic (currently, essentially goes through 2 cycles of login)
- sort new array values by time initially created when edited
- add email verification/password reset
### General
- add good documentation
- deploy via AWS EC2