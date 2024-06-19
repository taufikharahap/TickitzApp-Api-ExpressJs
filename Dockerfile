FROM node:18.20.3-buster-slim AS build
RUN mkdir -p /app
WORKDIR /app
COPY . /app
USER root
RUN rm -rf node_modules && npm install

FROM node:18.20.3-buster-slim
COPY --from=build /app /usr/src/app
WORKDIR /usr/src/app
# sesuakan dengan port yang dipakai
EXPOSE 8001 
# sesuaikan dngan nama entry pointnya
CMD ["app.js"]