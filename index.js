const http = require('node:http')
const fs = require('node:fs')

const PORT = process.env.PORT ?? 1234

const err404 = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.statusCode = 404 // Not Found
  res.end('<h1>404</h1>')
}

const methodGet = (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>¡Hola mundo!</h1>')
    return true
  }

  if (req.url === '/logo.webp') {
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
    err404(req, res)
  }

  return false
}

const methodPost = (req, res) => {
  if (req.url === '/contacto') {
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
    err404(req, res)
  }
}

const proccesRequest = (req, res) => {
  if (req.method === 'GET') {
    methodGet(req, res)
  }

  if (req.method === 'POST') {
    methodPost(req, res)
  }
}

// Ejercicio 1: crear servidor http con Node
function startServer () {
  const server = http.createServer(proccesRequest)

  return server.listen(PORT, () => {
    console.log('Escuchando el puerto: http://localhost:' + PORT)
  })
}

module.exports = {
  startServer
}
