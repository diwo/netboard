FROM node:12.4-alpine

WORKDIR /work
ADD package.json ./
RUN npm install
ADD . ./

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
