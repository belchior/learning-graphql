
FROM node:12 as dependencies
WORKDIR /usr/app
COPY package*.json ./
RUN ["npm", "ci"]
COPY . ./
ARG HOST_SERVER
ENV REACT_APP_HOST_SERVER=${HOST_SERVER}
ENV CI=true
RUN ["npm", "run", "build"]
RUN ["npm", "run", "test:ci"]


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=dependencies /usr/app/build/ ./
COPY --from=dependencies /usr/app/nginx.conf /etc/nginx/
ARG HOST_SERVER_CONTAINER
RUN if [ "$HOST_SERVER_CONTAINER" ]; then sed -i -e "s|#location|location|; s|HOST_SERVER_CONTAINER|${HOST_SERVER_CONTAINER}|" /etc/nginx/nginx.conf; fi
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


## Build and run locally
## server should be ready first
# docker build . -t learning-graphql-client --build-arg HOST_SERVER_CONTAINER=learning-graphql-server:4000
# docker run --name learning-graphql-client --network myNetwork -d -p 3000:80 learning-graphql-client
