const express = require('express')
const path = require('node:path')

const PORT = process.env.PORT ?? 1234
// const PATH_LOGO = path.join(__dirname, 'assets', 'logo.webp')
const PATH_LOGO = path.join(__dirname, 'assets')
// const PATH_LOGO = './assets'

// Ejercicio 2: crear servidor HTTP con express
async function startServer () {
  const app = express()
  app.disable('x-powered-by')

  // Middleware
  app.use(express.json())
  app.use(express.static(PATH_LOGO))

  // Routers
  routers(app)
  // Server
  const server = await app.listen(PORT, () => {
    console.log('Server in ' + PORT)
  })

  return server
}

function routers (app) {
  app.all('/', ({ method }, res) => {
    if (method === 'GET') {
      res.send('<h1>¡Hola mundo!</h1>')
    } else {
      res.status(405).send('<h1>405</h1>')
    }
  })

  // app.get('/logo.webp', (req, res) => {
  //   res.contentType('image/webp')
  //   res.sendFile(PATH_LOGO)
  // })

  app.all('/contacto', ({ body, method }, res) => {
    if (method === 'POST') {
      res.status(201).send(body)
    } else {
      res.status(405).send('<h1>405</h1>')
    }
  })

  app.all('/404', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  app.use((req, res) => { res.status(404).send('<h1>404</h1>') })
}

// startServer()

module.exports = {
  startServer
}
