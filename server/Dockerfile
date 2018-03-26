FROM ubuntu:16.04

WORKDIR /app
RUN apt-get update && apt-get install nodejs-legacy npm mongodb -y
COPY . /app
CMD ls -la
CMD service mongodb start
#CMD ip addr
#CMD echo "db.currentOp(true)" | mongo
CMD node server.js

EXPOSE 8080