const axios = require('axios');
const bot = require('./chat-bot.js');

setInterval(() => {
    axios.get('https://tts-bot-service.herokuapp.com/').then(data => {
        console.log('Ok');
    })
}, (20 * 60 * 1000));

setInterval(() => {
    axios.get('https://twitch-da-api.glitch.me/getDonations/123').then(data => {
        console.log('Ok');
    })
}, (4 * 60 * 1000));
