FROM node:8

# Set environment variables
ENV appDir /var/www/app/current
ENV PORT 5000

# Run updates and install deps
RUN apt-get update -y && \
    apt-get install -qy netcat && \
    rm -rf /var/lib/apt/lists/*

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

# install typescript & sequelize-cli compiler globally
RUN npm install typescript sequelize-cli -g

# Add a script which will wait a database
ADD wait-for ./

# Add our package.json and install *before* adding our app files
ADD package.json ./
RUN npm install

# Add app files
ADD . /var/www/app/current

# compile & build project
RUN npm run build

#Expose the port
EXPOSE 5000

CMD ["npm", "start"]
