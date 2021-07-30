const { Router } = require('express')
const router = Router()

const Message = require('../models/Message')

router.post('/api/last-messages', async (req, res) => {
  let limit = +req.body.limit
  if (isNaN(limit)) limit = 10

  const lastMessages = await Message.find().limit(limit)
  res.json(lastMessages)
})

module.exports = router