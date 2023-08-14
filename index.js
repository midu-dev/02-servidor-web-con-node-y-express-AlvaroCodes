const http = require('node:http')
const fs = require('node:fs')

const PORT = process.env.PORT ?? 1234
const routerGet = {
  home: '/',
  logo: '/logo.webp'
}
const routerPost = {
  contact: '/contacto'
}

const err = (req, res, status = 404) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.statusCode = status // Not Found
  res.end(`<h1>${status}</h1>`)
}

const methodGet = (req, res) => {
  if (req.url === routerGet.home) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>¡Hola mundo!</h1>')
    return true
  }

  if (req.url === routerGet.logo) {
    fs.readFile('./assets/logo.webp', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.statusCode = 500
        res.end('<h1>Internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/webp')
        res.end(data)
      }
    })
  } else {
    err(req, res)
  }

  return false
}

const methodPost = (req, res) => {
  if (req.url === routerPost.contact) {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 201
      res.end(data)
    })
  } else {
    err(req, res)
  }
}

const proccesRequest = (req, res) => {
  if (req.method === 'GET') {
    methodGet(req, res)
  }

  if (Object.keys(routerGet).some((key) => routerGet[key] === req.url)) {
    err(req, res, 405)
    return
  }

  if (req.method === 'POST') {
    methodPost(req, res)
  }
}

// Ejercicio 1: crear servidor http con Node
function startServer () {
  const server = http.createServer(proccesRequest)

  server.listen(PORT, () => {
    console.log('Escuchando el puerto: http://localhost:' + PORT)
  })

  return server
}

// startServer()

module.exports = {
  startServer
}
