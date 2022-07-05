FROM node:16.14

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

COPY ./ ./

RUN npx prisma generate

CMD ["npm", "run", "start"]