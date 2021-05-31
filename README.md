## Common
There is a simple server to get infromation abotu student and their work. It will calculate the most preferable  student
for specific job.
### Prereuiremints:
 - `npm install -g ts-node`
### Start server
1. `npm install`
2. `npm run tsc`
3. `npm run start:dev`

#### Start server with docker
1. Build image: `docker build -t docker_id/server_name:latest -f DockerFile.dev`
2. Run: `docker run -p 3700:3700 docker_id/server_name`

 - To stop container:  
    1. `containerId=$(docker container ls -a --filter ancestor=docker_id/server_name)`
    2. `docker stop $containerId`

### Build server
You should run this commad to build the server: `npm run build`
### Used packages
 - bcrypt - used to hash passwords.
 - body-parser - used for parsing requests bodies
 - express - Fast, unopinionated, minimalist web framework for node
 - express-validator - validate passwords, emails and etc on the server side
 - jsonwebtoken - create tokens and sessions
 - mongoose - easier connection for mongodb
 - nodemailer - send emails for passwords reseting and etc
 - nodemon - easier debug and rerun server