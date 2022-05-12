FROM node:16-alpine

# Create app directory
WORKDIR /app
RUN mkdir -p back-end
RUN mkdir -p front-end

# Copy apps dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY /back-end-nodejs/package*.json ./back-end/
COPY /front-end-reactjs/package*.json ./front-end/

RUN npm cache clean --force

# Install back-end app packages 
RUN npm --prefix ./back-end/ install
COPY ./back-end-nodejs/ ./back-end/

# Install front-end app packages 
RUN npm --prefix ./front-end/ install
COPY ./front-end-reactjs/ ./front-end/

# Ports {3000 for front-end} & {30003 for back-end}
EXPOSE 3000 30003

CMD npm --prefix ./back-end/ start & npm --prefix ./front-end/ start 
