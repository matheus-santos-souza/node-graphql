FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src src
COPY prisma prisma

RUN npm ci
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:dev"]

FROM node:20 as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/dist /usr/src/app

CMD ["node", "server.cjs"]