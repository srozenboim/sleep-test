const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/api/submit', (req, res) => {
  debugger;
  const { number } = req.body;
  if (typeof number === 'number') {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

server.use(router);
server.listen(5001, () => {
  console.log('JSON Server is running');
});