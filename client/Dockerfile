
FROM node:12 as dependencies
WORKDIR /usr/app

COPY package*.json ./
RUN ["npm", "ci"]
COPY . ./

ARG REACT_APP_SERVER_URL
ENV CI=true
RUN ["npm", "run", "build"]
RUN ["npm", "test"]


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=dependencies /usr/app/build/ ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


## Build and run locally
# docker build -t client --build-arg REACT_APP_SERVER_URL=http://localhost:4000 .
# docker run --name client -d -p 3000:80 client
