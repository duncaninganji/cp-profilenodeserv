FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8082

RUN export GOOGLE_APPLICATION_CREDENTIALS="credentials.json" 

CMD ["npm", "start"]