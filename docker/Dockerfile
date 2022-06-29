FROM node:14.19

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --chown=root:root ./ /app
RUN npm run prebuild
RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]

