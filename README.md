## Common
There is a simple server to get infromation abotu student and their work. It will calculate the most preferable  student
for the specific job.

### Prereuiremints:
 - `npm install -g ts-node`

1. [To run dev server](docs/Dev-server.md)
2. [Work with docker](docs/Work-with-docker.md)

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