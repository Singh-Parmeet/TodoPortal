# Use latest node version 10.x
FROM node:alpine
# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# copy all file from current dir to /app in container
COPY ./js-express-boilerplate /app/

RUN npm install

# expose port 9000
EXPOSE 7000

# cmd to start service
CMD [ "npm run start"]
