const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const questions = require('../questions')
const rando = require('../rando')
const emojis = require('../emojis')

const param = config.twitterConfig
const randomReply = unique(param.randomReply.split('|'))

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
function tweetNow(text) {
  let tweet = {
    status: text
  }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.lol('ERRORDERP Reply', err)
    }
    console.lol('SUCCESS: Replied: ', text)
  })
}

// function: replies to user who followed
const reply = event => {
  // get user's twitter handler/screen name
  let screenName = event.source.screen_name

  if (screenName === config.twitterConfig.username) {
    return
  }
  const reply = randomReply()
  const question = rando(questions)
  const emoji = rando(emojis)

  const response = reply.replace('${screenName}', screenName)
    .replace('${question}', question)
    .replace('${emoji}', emoji)

  tweetNow(response)
}

module.exports = reply
