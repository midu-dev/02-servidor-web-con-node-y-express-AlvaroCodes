const Express = require('express')
const Path = require('node:path')

const PORT = 1234
// const PATH_LOGO = Path.join(__dirname, 'assets', 'logo.webp')
const PATH_LOGO = Path.join(__dirname, 'assets')
// const PATH_LOGO = './assets'

// Ejercicio 2: crear servidor HTTP con Express
async function startServer () {
  const app = Express()
  app.disable('x-powered-by')

  // Middleware
  app.use(Express.json())
  app.use(Express.static(PATH_LOGO))

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

  app.all('*', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })
}

// startServer()

module.exports = {
  startServer
}
