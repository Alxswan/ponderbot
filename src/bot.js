// listen on port so now.sh likes it
const { createServer } = require('http')

// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const consoleLol = require('console.lol')

const bot = new Twit(config.twitterKeys)

const tweet = require('./api/tweet')
const reply = require('./api/reply')
const thank = require('./api/thank')

console.rofl('Bot starting...')

tweet()
setInterval(tweet, config.twitterConfig.tweet)

// reply to new follower
const userStream = bot.stream('user')
userStream.on('follow', reply)

userStream.on('tweet', thank)

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)