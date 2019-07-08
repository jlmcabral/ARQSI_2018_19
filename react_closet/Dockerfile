# are running the same version of Node.
FROM node:8.12.0

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm install

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Tell Docker about the port we'll run on.
EXPOSE $PORT

# Set the command to start the node server.
CMD serve -s build -l $PORT
