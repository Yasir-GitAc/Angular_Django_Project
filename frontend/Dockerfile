# Stage 1: Build Angular app
FROM node:20.10.0-alpine as build

WORKDIR /ang_frontend

#1
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
#2
COPY . .

#CMD /ang_frontend/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck

#3
RUN npm run build
# RUN npm run build --prod

# RUN ng serve

# Stage 2: Serve app with nginx server
FROM nginx:stable

COPY --from=build /ang_frontend/dist/frontend/browser/ /usr/share/nginx/html
# COPY --from=build /app/dist/frontend/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


#1 coping packages into working directory by ./
#2 everything will be copied in the working dir itc /ang_frontend
#3 in the cmd ng build in updated with ng build --configuration production this will
# be used in environment
