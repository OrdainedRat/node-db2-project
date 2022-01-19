// DO YOUR MAGIC
const express = require('express')
const Cars = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')
const router = express.Router()

router.get('/', async (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', checkCarId, async (req, res, next) => {
   res.status(200).json(req.car)
})

router.post('/', checkCarPayload,  checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    Cars.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router