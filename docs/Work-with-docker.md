## Start server with docker
1. Build image: `docker build -t docker_id/server_name:latest -f DockerFile.dev`
2. Run: `docker run -p 3700:3700 docker_id/server_name`

### To stop container:  
1. `containerId=$(docker container ls -a --filter ancestor=docker_id/server_name)`
2. `docker stop $containerId`

### To remove container:  
1. `containerId=$(docker container ls -a --filter ancestor=docker_id/server_name)`
2. `docker container rm $containerId`

### To remove image:
1. 
2. 