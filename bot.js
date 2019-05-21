/* jshint esversion: 8 */

require('dotenv').config();
const tmi = require('tmi.js');
const axios = require('axios');

const opts1 = {
  identity: {
    username: 'fake_cemka_bot',
    password: process.env.PASS1
  },
  channels: [
    'cemka'
  ]
};

let bot1 = 1;

const opts2 = {
  identity: {
    username: 'fake_taer_bot',
    password: process.env.PASS2
  },
  channels: [
    'taerss'
  ]
};


const client1 = new tmi.client(opts1);
client1.on('message', onMessageHandler1);
client1.on('connected', function(){ return connectClient(client1,opts1.channels[0]); });
client1.connect();

const client2 = new tmi.client(opts2);
client2.on('message', onMessageHandler2);
client2.on('connected', function(){ return connectClient(client2,opts2.channels[0]); });
client2.connect();


function getMusic() {
  var authOptions = {
    method: 'GET',
    url: `https://api.dubtrack.fm/room/cemkaplugdj`,
    json: true
  };
  return axios(authOptions)
    .then(data => {
      return {name: data.data.data.currentSong.name, type: data.data.data.currentSong.type,  url: data.data.data.currentSong.fkid};
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
    .then(response => { return (response.data.stream != null);});
 }

function connectClient (cl, chan){
  (function onConnectedHandler() {
    var currentSong = '';
    setInterval(_=>{
      getMusic().then(data =>{
        if (data.name != currentSong){
          console.log(data);
          currentSong = data.name;
          if ((chan == opts1.channels[0]) && (bot1 == 1)){
            streamLive('118263259').then(ret => {
              if (ret){
                if (data.type == 'youtube'){
                  cl.say(chan, 'Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' ' + 'https://www.youtube.com/watch?v='+data.url+' '+'cemkaPls');
                } else if (data.type == 'soundcloud'){
                  cl.say(chan, 'Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj cemkaPls');
                }
              }
            });
          }
          if (chan == opts2.channels[0]){
            streamLive('36948149').then(ret => {
              if (ret){
                if (data.type == 'youtube'){
                  cl.say(chan, 'Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' ' + 'https://www.youtube.com/watch?v='+data.url+' '+'cemkaPls');
                } else if (data.type == 'soundcloud'){
                  cl.say(chan, 'Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj cemkaPls');
                }
              }
            });
          }
        }
      });
    },5000);
  })();
}

function onMessageHandler1(target, context, msg, self) {
  if (self) {
    return;
  }
  if (/!music/gi.test(msg) || /!song/gi.test(msg) || /!track/gi.test(msg) || /!dub/gi.test(msg) || /!трек/gi.test(msg)){
    (function newMusic() {
      getMusic().then(data => {
          console.log(data);
          if (bot1 == 1){
            if (data.type == 'youtube'){
              client1.say(target, '@' + context.username + ' Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' ' + 'https://www.youtube.com/watch?v='+data.url+' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj FeelsAmazingMan');
            } else if (data.type == 'soundcloud'){
              client1.say(target, '@' + context.username + ' Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' '+'Заходи к нам, жабич: https://www.dubtrack.fm/join/cemkaplugdj FeelsAmazingMan');
            }
          }
        });
    })();
  }
  if (/!fakeon/gi.test(msg)){
    if ((context.badges && (context.badges.moderator || context.badges.broadcaster)) || (context.username == 'fake_fake_fake_')){
      bot1 = 1;
      client1.say(target, '@' + context.username + ' Бот включен');
    }
  }
  if (/!fakeoff/gi.test(msg)){
    if ((context.badges && (context.badges.moderator || context.badges.broadcaster)) || (context.username == 'fake_fake_fake_')){
      bot1 = 0;
      client1.say(target, '@' + context.username + ' Бот выключен');
    }
  }
}

function onMessageHandler2(target, context, msg, self) {
  if (self) {
    return;
  }
  if (/!music/gi.test(msg) || /!song/gi.test(msg) || /!track/gi.test(msg) || /!dub/gi.test(msg) || /!трек/gi.test(msg)){
    (function newMusic() {
      getMusic().then(data => {
          console.log(data);
          if (data.type == 'youtube'){
            client2.say(target, '@' + context.username + ' Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' ' + 'https://www.youtube.com/watch?v='+data.url+' '+'Заходи к нам, пират: https://www.dubtrack.fm/join/cemkaplugdj FeelsAmazingMan');
          } else if (data.type == 'soundcloud'){
            client2.say(target, '@' + context.username + ' Сейчас играет: ' + data.name.replace(/\&apos\;/gi,'\'').replace(/\&amp\;/gi,'&').replace(/\&quot\;/gi,'"') + ' '+'Заходи к нам, пират: https://www.dubtrack.fm/join/cemkaplugdj FeelsAmazingMan');
          }
        });
    })();
  }
}
