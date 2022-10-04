const fs = require('fs')

class ProductsApi {
    constructor(name){
        this.name=name
    }


    async save(newProduct){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            let max = 0
            contenidoJson.forEach(element => {
                if (element.id>max){
                    max=element.id
                }})
            const newId=max+1
            console.log(newId);
            const {title, price, thumbnail} = newProduct
            const newModifiedProduct = {
                title,
                price,
                thumbnail,
                id: newId
            }
            contenidoJson.push(newModifiedProduct)
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson, null, 2)) 
            
            return newModifiedProduct

        }
        catch(error){
            console.log(error.message);
        }
    } 
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            return contenidoJson
        }
        catch(error){
            console.log(error.message); 
        }
    }
    async getById(id){
        try {
            const contenido = await fs.promises.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido);
            const productoFiltered= contenidoJson.filter(element=>element.id=== +id)
            if (productoFiltered.length===0){
                return {error: `Product with id: ${id} does not exist!`}
            }else{
                return  productoFiltered  
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            const contenidoJson = JSON.parse(contenido)
            const productIndex= contenidoJson.findIndex(element=>element.id===+id)
            if (productIndex<0){
                return {error: `Product with id: ${id} does not exist!`};
            }else{
                contenidoJson.splice(productIndex,1)
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson, null, 2))
                return contenidoJson
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(`./${this.name}`,[])
        }catch(error){
            console.log(error.message);
        }
    }
    
    
    async update(id, productToUpdate){
        try{
            const {title, price, thumbnail} = productToUpdate
            console.log(productToUpdate);
            if ( !title || !price || !thumbnail) {
                    return ({ error: 'Wrong body format' });
                };
            const contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            
            const productIndex = contenidoJson.findIndex((element) => element.id === +id);
            if (productIndex < 0) return ({error: `Product with id: ${id} does not exist!`});
            const updatedProduct = {
                ...contenidoJson[productIndex],
                title,
                price,
                thumbnail
            };
            
            console.log(updatedProduct);
            contenidoJson[productIndex] = updatedProduct;
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidoJson, null, 2))
            return updatedProduct 
            
        } catch (error) {
            console.log(error.message);
        }
    }
}

let contenedor1 = new ProductsApi ("productos.json")

module.exports= ProductsApi





/* const newInfo = {
    
        "id":1,
        "title":"It",
        "price":50
} */

/* contenedor1.save(newInfo).then( resolve=>{
    console.log(resolve);
}) */

/* contenedor1.getById(4).then(resolve=>{
    console.log(resolve);
}); */

/* contenedor1.getAll().then(resolve=>{
    console.log(resolve);
}); */
/* 
contenedor1.deleteById(5) */

/* contenedor1.deleteAll() */





















/* 

const fs = require ('fs/promises')

class Contenedor {
    constructor(name){
        this.name=name
    }

    async save(informacion){
        try{
            const contenido = await fs.readFile(`./${this.name}`, 'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const ultimoIndice = contenidoJson.length - 1
            const ultimoId = contenidoJson[ultimoIndice].id
            informacion.id = ultimoId + 1
            const id = informacion.id
            contenidoJson.push(informacion)
            await fs.writeFile(`./${this.name}`, JSON.stringify(contenidoJson))


            return id
        }
        catch(error){
            console.log(error.message);
        }
    }
   
    async getAll(){
        try{
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            
            return contenidoJson
        }
        catch(error){
            console.log(error.message); 
        }
    }
    async getById(id){
        try {
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido);
            let contenidoDentroDelArray = null;
            contenidoJson.forEach(element => {
                if (element.id==id) {
                    contenidoDentroDelArray=element;
                }
            });
            return contenidoDentroDelArray;

        } catch (error) {
            console.log(error.message);
        }
    }
    async deleteById(id){
        try{
            const contenido = await fs.readFile(`./${this.name}`,'utf-8');
            const contenidoJson = JSON.parse(contenido)
            const nuevo = contenidoJson.filter((el)=>el.id!=id)

            await fs.writeFile(`./${this.name}`, JSON.stringify(nuevo))
        }
        catch(error){
            console.log(error.message);
        }
    }
    async deleteAll(){
        try{
            await fs.writeFile(`./${this.name}`,[])
        }catch(error){
            console.log(error.message);
        }
    }
    }


let contenedor1 = new Contenedor ("productos.json")
module.exports=contenedor1
const newInfo = {
    
        "id":1,
        "title":"It",
        "price":50
}

*/