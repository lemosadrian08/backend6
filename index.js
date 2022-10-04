const express = require('express');
const apiRoutes = require('./routers/app.routers');
const path =require('path');

const ProductsApi = require ('./contenedor');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');


const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsApi = new ProductsApi('productos.json')

const products=[]
const messages=[]

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(express.static('public')) */
app.use(express.static(path.resolve(__dirname, './public')));


// Routes
/* app.use('/api', apiRoutes)

app.get('/products', (req,res)=>{
  productsApi.getAll().then((products) => 
  res.render('index', {products})) 
})

app.post('/products', (req,res)=>{
  productsApi.save(req.body)
  res.redirect('/products')
})  */

//Listen
const connectedServer = httpServer.listen(PORT, ()=>{
  console.log("Server is up and running on port ", PORT);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})


// Socket Events
io.on('connection', (socket)=>{
  console.log("New Clien conection");
  socket.emit("products", [...products])
  
  
  //Product
  socket.on("new-product", (newProduct)=>{
    products.push(newProduct)
    io.emit('products', products) 
  })

 
})

io.on("connection", (socket) => {
    console.log("There is a new client in the chat");
    socket.emit("messages", messages);
    console.log(messages);
  
    socket.on("new-message", (data) => {
      messages.push(data);
      io.sockets.emit("messages", messages);
    });
  });