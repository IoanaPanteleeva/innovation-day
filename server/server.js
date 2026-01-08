import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

// Custom middleware for timestamps and CORS
server.use((req, res, next) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  // Add timestamps on POST
  if (req.method === 'POST' && req.body) {
    req.body.createdAt = new Date().toISOString()
    req.body.updatedAt = new Date().toISOString()
  }

  // Update timestamp on PUT/PATCH
  if ((req.method === 'PUT' || req.method === 'PATCH') && req.body) {
    req.body.updatedAt = new Date().toISOString()
  }

  next()
})

server.use(middlewares)
server.use(router)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
