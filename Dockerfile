FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm i --no-audit
COPY . .
RUN npm run build

##################################

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# to disable husky
RUN npm pkg set scripts.prepare="ls"
RUN npm i --no-audit --omit=dev

COPY --from=build /app/dist .
COPY --from=build /app/default-templates ./default-templates

CMD ["node", "-r", "source-map-support", "src/index.js"]
