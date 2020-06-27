
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
CMD [ "node", "build/server.js"]
