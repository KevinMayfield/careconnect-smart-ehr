### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8.11.3 as builder

# RUN apk add --no-cache bash

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --configuration=test --deploy-url /smart/ --base-href /smart/


### STAGE 2: Setup ###

FROM nginx:1.13.12-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/smart-epr /usr/share/nginx/html/smart

# Copy the EntryPoint
COPY nginx/entryPoint.sh /
RUN chmod +x /entryPoint.sh

# RUN ls /

RUN cat /entryPoint.sh

ENTRYPOINT ["/entryPoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
