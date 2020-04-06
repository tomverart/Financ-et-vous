#!bin/bash

read -p "Nom du répertoire de backend : " backend
read -p "Nom du répertoire de frontend  : " frontend

echo "
1 .Serveur express
2 .Serveur http par socket
Autre .Pas de serveur"
read -p "Choisisez le type de serveur : " -n 1 isExpress

vue create "$frontend"

mkdir "$backend"
cd "$backend"/

npm init
npm install uuid
npm install nodemon

if [ "$isExpress" = "1" ]
then
	# Express server
	npm install express
	npm install cors
	npm install body-parser
	touch server.js
	> server.js
	echo "const express = require('express');
const uuidV4 = require('uuid').v4;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser(bodyParser.json()));

app.get('/', (req, res) => {
});

app.post('/', (req, res) => {
});

app.put('/', (req, res) => {
});

app.delete('/', (req, res) => {
});

app.listen(3000);" >> server.js

elif [ "$isExpress" = "2" ]
then
	# Http server
	npm install socket.io
	npm install socket.io-client
	touch server.js
	> server.js
	echo "const socket = require('socket.io-client')('http://localhost:3000');
const uuidV4 = require('uuid').v4;

socket.on('connect', () => {
});

socket.on('event', () => {
});

socket.on('disconnect', () => {
});" >> server.js

  cd ../"$frontend"/src
  > main.js

  echo "import Vue from 'vue';
import App from './App.vue';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000')
  })
);

new Vue({
  render: h => h(App)
}).\$mount('#app');" >> main.js

else
	echo "Pas de serveur créé."
fi