const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if(!car) {
      res.status(404).json({ message: "car with id <car id> is not found" })
    } else {
      req.car = car
      next()
    }
  } catch(err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  console.log('here is the payload check')
  console.log(req.body)
  const { vin, make, model, mileage} = req.body
  if(!vin) {
    return res.status(400).json({message: 'vin is missing'})
  } 
  if(!make) {
    return res.status(400).json({message: 'make is missing'})
  } 
  if(!model) {
    return res.status(400).json({message: 'model is missing'})
  } 
  if(!mileage) {
    return res.status(400).json({message: 'mileage is missing'})
  } 
    
  next()
  
  
}

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body
  if(vinValidator.validate(vin)) {
    next()
  } else {
   res.status(400).json({message: `vin ${vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
  const existing = await Cars.getByVin(req.body.vin)
    if(!existing) {
      next()
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    }
  } catch(err) {
    next(err)
  }
 
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}