
FROM node:12-alpine as dependencies
WORKDIR /usr/app
COPY package*.json ./
RUN ["npm", "ci"]
COPY . ./
RUN ["npm", "run", "build"]
RUN ["npm", "test"]


FROM node:12-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY --from=dependencies /usr/app/build ./build
RUN ["npm", "ci", "--production"]
EXPOSE 4000
CMD [ "npm", "start"]


## Build and run locally
# docker network create myNetwork
# docker build . -t learning-graphql-server
# docker run -it \
# --name learning-graphql-server \
# --network myNetwork \
# -e CLIENT_URL='http://localhost:3000' \
# -e DATABASE_URL='mongodb://host.docker.internal:27017/learning-graphql' \
# -e NODE_ENV='production' \
# -e PORT='4000' \
# -e SERVER_URL='http://localhost:4000' \
# learning-graphql-server
