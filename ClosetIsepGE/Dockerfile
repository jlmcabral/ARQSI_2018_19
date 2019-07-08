
# are running the same version of Node.
FROM node:10.11.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .

# Install dependencies.
RUN npm install

# Set the command to start the node server.
CMD npm run start-prod

# Tell Docker about the port we'll run on.
EXPOSE 4000
