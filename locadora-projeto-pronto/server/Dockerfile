
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY src /usr/src/app/src
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/server.js"]
