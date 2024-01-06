const fs = require ('fs')
class ProductManager {
   static idProduct = 0
   constructor(ruta) {
     this.ruta = ruta;
     this.products = []
   }
   async createDataProduct(title, photo,price,stock){
    try{
        if (!title ||!photo || !price ||  !stock) {
            throw new Error("Error, todos los campos deben ser completados");
        }
        const product = {
            title,
            photo,
            price,
            stock,
        }
        product.id = ProductManager.idProduct++
        this.products.push(product)

        await fs.promises.writeFile(
            this.ruta, JSON.stringify(this.products, null, '\t') );
    }
    catch(error){
        console.log(error.mensaje)
    }

   }
    async readProducts(){
    try {
        const readProducts = await fs.promises.readFile('./products.json') 
        const searchProducts = JSON.parse(readProducts)
        console.log('readProducts',searchProducts)
        return searchProducts
        
    } 
    catch (error) {
        console.log(error.mensaje)
    }
        
   }
   async readOneProduct(id) {
    try{

        const readProducts = await fs.promises.readFile('./products.json') 
        const searchProducts = JSON.parse(readProducts)
        const searchId = await searchProducts.find((product) => product.id === id);
        if (!searchId) {
        throw new Error("Error, no se encontró el producto con el ID asignado");
        }
        console.log('readOneProduct',searchId)
        return searchId;
    }
    catch(error){
        console.log(error.mensaje)
    }
  }
}
// star : call methods
const startProcessProducts =async ()=>{
    const manager =  new ProductManager('./products.json')
    await manager.createDataProduct('vaca','photo',50,50)
    await manager.createDataProduct('toro','photo',100,100)
    await manager.createDataProduct('oveja','photo',200,200)
    await manager.readProducts()
    await manager.readOneProduct(2)
}
startProcessProducts()