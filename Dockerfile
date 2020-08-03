FROM node:10.10 as builder
  ARG NODE_ENV=development
  WORKDIR /app
  COPY . /app/
  RUN git config --global url."https://".insteadOf git:// && \
    git config --global url."https://github.com/".insteadOf git@github.com: && \
    npm --production=false \
        --unsafe-perm \
        --verbose \
        ci && npm run build && \
    npm cache clean --force

FROM nginx:stable-alpine
  COPY --from=builder /app/build/. /usr/share/nginx/html
