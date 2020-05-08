
FROM node:12-alpine as dependencies
WORKDIR /usr/app

COPY package*.json ./
RUN ["npm", "ci"]
COPY . ./
RUN ["npm", "run", "test:ci"]
RUN ["npm", "run", "build"]


FROM node:12-alpine
WORKDIR /usr/app
COPY package*.json ./
COPY --from=dependencies /usr/app/build ./build
RUN ["npm", "install", "--production"]
EXPOSE 4000
CMD [ "npm", "start"]


## Build and run locally
# docker build -t server .
# docker run -it \
# -e CLIENT_URL='http://localhost:3000' \
# -e DATABASE_URL='<mongodb url>' \
# -e NODE_ENV='production' \
# -e PORT='4000' \
# -e SERVER_URL='http://localhost:4000' \
# server
