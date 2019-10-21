/* jshint esversion: 8 */

require('dotenv').config();
const tmi = require('tmi.js');
const axios = require('axios');

const opts = {
  options: {
  debug: false
},
connection: {
  reconnect: true,
  secure: true
},
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [
    process.env.CHANNEL
  ]
};

let bot1 = 1;
let active = true;

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', connectClient);
client.connect();

function setTimer(a) {
  if (a) {
    active = false;
    setTimeout(() => {
      active = true;
    }, 15000)
  }
}

function getMusic() {
  var authOptions = {
    method: 'GET',
    url: `https://api.dubtrack.fm/room/cemkaplugdj`,
    json: true
  };
  return axios(authOptions)
    .then(data => {
      return data.data.data.currentSong ? { name: data.data.data.currentSong.name, type: data.data.data.currentSong.type,  url: data.data.data.currentSong.fkid } : '';
    });
}

function streamLive(streamer){
  var authOptions = {
    method: 'GET',
    url: `https://api.twitch.tv/kraken/streams/${streamer}`,
    headers: {
       'Client-ID': process.env.CLIENTID,
       'Accept': 'application/vnd.twitchtv.v5+json'
    },
    json: true
 };
 return axios(authOptions)
    .then(response => response.data.stream != null));
 }

function connectClient(){
  (function onConnectedHandler() {
    var currentSong = '';
    setInterval(_=>{
      getMusic().then(data =>{
        if (data && data.name !== currentSong){
          currentSong = data.name;
          if (bot1 == 1){
            streamLive('118263259').then(ret => {
              if (ret){
                if (data.type == 'youtube'){
                  client.say(opts.channels[0], 'Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' ' + 'https://www.youtube.com/watch?v='+data.url+' '+'cemkaPls');
                } else if (data.type == 'soundcloud'){
                  client.say(opts.channels[0], 'Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj cemkaPls');
                }
              }
            });
          }
        }
      });
    }, 5000);
  })();
}

function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  }
  let isPrem = () => ((context.badges && (context.badges.moderator || context.badges.broadcaster)) || (context.username === 'fake_fake_fake_'));
  if (/!music/gi.test(msg) || /!song/gi.test(msg) || /!track/gi.test(msg) || /!dub/gi.test(msg) || /!трек/gi.test(msg)){
    (function newMusic() {
      getMusic().then(data => {
          if (bot1 == 1 && active){
            setTimer(active);
            if (data.type == 'youtube'){
              client.say(target, '@' + context.username + ' Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' ' + 'https://www.youtube.com/watch?v='+data.url+' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj FeelsAmazingMan');
            } else if (data.type == 'soundcloud'){
              client.say(target, '@' + context.username + ' Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj FeelsAmazingMan');
            }
          }
        });
    })();
  } else
  if (/^!fakeon$/gi.test(msg)){
    if (isPrem()){
      bot1 = 1;
      client.say(target, '@' + context.username + ' Бот включен');
    }
  } else
  if (/^!fakeoff$/gi.test(msg)){
    if (isPrem()){
      bot1 = 0;
      client.say(target, '@' + context.username + ' Бот выключен');
    }
  }
}