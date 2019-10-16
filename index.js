const axios = require('axios');
const bot = require('./chat-bot.js');

setInterval(() => {
    axios.get('https://tts-bot-service.herokuapp.com/').then(data => {
        console.log('Ok');
    })
}, (20 * 60 * 1000))