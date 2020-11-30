import express from 'express'

function getAbacateRoutes() {
  const router = express.Router()
  router.get('/abacate', abacate)
  return router
}

async function abacate(req, res) {
  res.json({ fruta: 'abacate' })
}

export {getAbacateRoutes}