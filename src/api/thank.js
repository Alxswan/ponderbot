const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const rando = require('../rando')
const emojis = require('../emojis')
const isReply = require('../helpers/isReply')

const param = config.twitterConfig
const randomThanks= unique(param.randomThanks.split('|'))

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
function tweetNow(text, id_str) {
  let tweet = {
    status: text,
    in_reply_to_status_id: id_str,
    auto_populate_reply_metadata: true,
  }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.lol('ERRORDERP Reply', err)
    }
    console.lol('SUCCESS: Replied: ', text, id_str)
  })
}

// function: replies to user who followed
const thank = event => {
  // get user's twitter handler/screen name
  if (Math.floor(Math.random() * 11) <= 9) {
    let screenName = event.user.screen_name

    if (screenName === config.twitterConfig.username || !isReply(event)) {
      return
    }

    let id_str = event.id_str

    const reply = randomThanks()
    const emoji = rando(emojis)

    const named = reply.replace('${screenName}', screenName)
    const res = named.replace('${emoji}', emoji)

    tweetNow(res, id_str)
  }
}

module.exports = thank
