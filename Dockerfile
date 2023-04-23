FROM node:16-alpine AS builder
WORKDIR '/app'

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
RUN yarn build

FROM node:16-alpine

WORKDIR '/usr/src/app'

COPY --from=builder /app/build .

# Install requirements
RUN npm install serve -g

# Run container
EXPOSE 80
CMD ["sh", "-c", "serve -s build -l 80"]
