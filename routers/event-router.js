const { eventController } = require('../controllers')

const router = require('express').Router()

router.post('/get/:id', eventController.getEvents)
router.post('/post', eventController.postEvent)
router.patch('/patch/:id', eventController.patchEventById)

module.exports = router