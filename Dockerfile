FROM node:18

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN echo "Step A"
RUN echo "Step B"
RUN echo "Step C"

CMD ["node", "app.js"]