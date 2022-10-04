const { application } = require('express')
const express =require('express')
const ProductsApi = require ('../../contenedor')
const productos = require ('../../productos.json')
const fs = require('fs')

const productsApi = new ProductsApi('productos.json')
const router = express.Router()

//Middleware
router.use(express.json())


// Routes
router.get('/', (req,res)=>{
    productsApi.getAll().then((products) => res.send(products)) 
})

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    productsApi.getById(id).then((product) => res.send(product))
})

router.get('/productosRandom', (req,res)=>{
    productsApi.getById(Math.floor(Math.random()*(3-1+1))+1).then((products) => res.send(products)) 
})

router.post('/',(req,res)=>{
    const newProduct = req.body
    productsApi.save(newProduct).then((newModifiedProduct)=> res.send(newModifiedProduct))
})

router.put('/:id', (req, res) => {
    
    const { id } = req.params
    const productToUpdate = req.body
    productsApi.update(id, productToUpdate).then((newModifiedProduct)=> res.send(newModifiedProduct))

});

router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    productsApi.deleteById(id).then((products) => { res.send(products)
        
        
})
    
})

module.exports = router