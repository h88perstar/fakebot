const axios = require('axios');
const bot = require('./chat-bot.js');

setInterval(() => {
    axios.get('https://twitch-tts-bot-service.glitch.me/').then(data => {
        console.log('Ok');
    })
}, (4 * 60 * 1000))