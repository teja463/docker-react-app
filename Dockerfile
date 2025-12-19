# FROM node

# WORKDIR /app/client

# COPY . .

# RUN npm install

# CMD ["npm", "run", "docker"]


FROM node:lts-alpine AS build

WORKDIR /app/client

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.29.4-alpine

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


