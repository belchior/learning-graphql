FROM node:alpine as dependencies

WORKDIR /usr/app

COPY package*.json ./
RUN ["npm", "ci"]

COPY . ./
ENV CI=true
RUN ["npm", "test"]
RUN ["npm", "run", "build"]


FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=dependencies /usr/app/build/ ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


## Build and run locally
# docker build -t client .
# docker run --name client -d -p 3000:80 client
