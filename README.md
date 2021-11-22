## Humanize

docker-compose runs all services in separate containers and also sets postgres database, kafka and zookeeper.

To use the project.
- clone repository
- run `docker-compose up --scale processing-service=2`
- the auth service will be available on `localhost:3001/auth`
- the data mart service api on `localhost:3002/data`