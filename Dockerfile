FROM node:8-onbuild

HEALTHCHECK --interval=5s --timeout=5s CMD curl -f http://127.0.0.1:8081 || exit 1

COPY config/local.js .
COPY config/datastores.js .

EXPOSE 8081


