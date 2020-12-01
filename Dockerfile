# build stage

FROM node:12-alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm i

ARG REACT_APP_API_BASE

ENV REACT_APP_API_BASE $REACT_APP_API_BASE

COPY ./ /app/

RUN npm run build


# production stage

FROM nginx:1.17-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

