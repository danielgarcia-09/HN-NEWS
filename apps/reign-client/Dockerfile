
FROM reign-total AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . ./
RUN npx nx build reign-client ${BUILD_FLAG}

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/apps/reign-client ./
COPY --from=builder /app/builder/apps/reign-client/nginx.conf /etc/nginx/nginx.conf