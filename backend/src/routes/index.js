const { Router } = require('express')
const router = Router()
const db = require('../services/dataBase')

router.get('/', (req, res) => {
    const data = db.getAll() || []
    res.json(data)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const data = db.get(id)
    if (data)
        res.status(200).json(data)
    else
        res.status(400).json()
})

router.post('/', (req, res) => {
    const nData = req.body
    const data = db.insert(nData)
    if (data)
        res.json(data)
    else
        res.status(400).json()
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const nData = req.body
    const data = db.update(id, nData)
    if (data)
        res.status(200).json()
    else
        res.status(400).json()
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const data = db.delete(id)
    if (data)
        res.status(200).json()
    else
        res.status(400).json()
})

module.exports = router