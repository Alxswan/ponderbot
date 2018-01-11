const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const questions = require('../questions')
const rando = require('../rando')
const emojis = require('../emojis')

const param = config.twitterConfig

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
function tweetNow(text) {
  let tweet = {
    status: text
  }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.lol('ERRORDERP Tweet', err)
    }
    console.lol('SUCCESS: Tweeted: ', text)
  })
}

const tweet = () => {
  const question = rando(questions)
  const emoji = rando(emojis)
  tweetNow(`${emoji}: ${question}`)
}

module.exports = tweet
