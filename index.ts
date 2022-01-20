const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');


const host = 'm14.cloudmqtt.com'
const port = '12891'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'vqlvmcfj',
  password: 'Vzw6NIX4voxY',
  reconnectPeriod: 1000,
})

const topic = 'distancia'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe(['distancia'], () => {
    console.log(`Subscribe to topic distancia`)
  })
  client.subscribe(['luminosidade'], () => {
    console.log(`Subscribe to topic luminosidade`)
  })
  client.subscribe(['indoor/temperatura'], () => {
    console.log(`Subscribe to topic indoor/temperatura`)
  })
  client.subscribe(['indoor/umidade'], () => {
    console.log(`Subscribe to topic indoor/umidade`)
  })
  client.subscribe(['outdoor/temperatura'], () => {
    console.log(`Subscribe to topic outdoor/temperatura`)
  })
  client.subscribe(['outdoor/umidade'], () => {
    console.log(`Subscribe to topic outdoor/umidade`)
  })

})

const app = express();
app.use(cors())
app.listen(3004, () => console.log("server is running"));

const topicos = {
  distancia: 0,
  luminosidade: 0,
  indoorTemperatura: 0,
  indoorUmidade: 0,
  outdoorTemperatura: 0,
  outdoorUmidade: 0,
}

client.on('message', (topic, payload) => {
  switch (topic) {
    case 'distancia':
      topicos['distancia'] = payload.toString();
      break;
    case 'luminosidade':
      topicos['luminosidade'] = payload.toString();
      break;
    case 'indoor/temperatura':
      topicos['indoorTemperatura'] = payload.toString();
      break;
    case 'indoor/umidade':
      topicos['indoorUmidade'] = payload.toString();
      break;
    case 'outdoor/temperatura':
      topicos['outdoorTemperatura'] = payload.toString();
      break;
    case 'outdoor/umidade':
      topicos['outdoorUmidade'] = payload.toString();
      break;
    default:
      break;
  }
  console.log(topicos)
})

app.get(`/distancia`, (req, res) => {
  res.send(topicos['distancia'])
})
app.get(`/luminosidade`, (req, res) => {
  res.send(topicos['luminosidade'])
})
app.get(`/indoor/temperatura`, (req, res) => {
  res.send(topicos['indoorTemperatura'])
})
app.get(`/indoor/umidade`, (req, res) => {
  res.send(topicos['indoorUmidade'])
})
app.get(`/outdoor/temperatura`, (req, res) => {
  res.send(topicos['outdoorTemperatura'])
})
app.get(`/outdoor/umidade`, (req, res) => {
  res.send(topicos['outdoorUmidade'])
})





