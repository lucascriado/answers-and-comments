import express from 'express';
import fs from 'fs';
import https from 'https';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurações para o servidor HTTPS, adicionar as chaves privadas e o certificado

const options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/lucascriado.com/privkey2.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/lucascriado.com/fullchain2.pem')
};

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const app = express();

// Serve os arquivos estáticos do React, realizar o build do projeto antes de rodar o servidor
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const jsonServerPort = 9003;
const appPort = 9002;

https.createServer(options, server).listen(jsonServerPort, () => {
  console.log(`JSON Server is running at https://localhost:${jsonServerPort}`);
});

https.createServer(options, app).listen(appPort, () => {
  console.log(`Aplicação rodando em https://localhost:${appPort}`);
});