FROM node:6
EXPOSE 3000
WORKDIR /app
ADD ./package.json /app/
WORKDIR /app
RUN npm install --production
CMD npm start --production
