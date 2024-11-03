FROM node:latest as nodejs
WORKDIR /src
COPY package.json /src/package.json
COPY . .
RUN npm install
RUN npm run build
RUN  npm rebuild bcrypt --build-from-source
EXPOSE 4000
CMD [ "node","dist/server.js" ]
