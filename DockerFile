FROM node:16-alpine AS builder
WORKDIR '/app'

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
RUN yarn build

FROM nginx:1.22.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
