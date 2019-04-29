FROM node:10.13.0

WORKDIR /src
COPY ./ ./
RUN npm install

CMD [ "/bin/bash" ]