const fs = require ('fs')

class UserManager {
    static idUser = 0
    constructor(ruta) {
      this.ruta = ruta;
      this.users = []
    }
    async createDataUser(name, photo,email){
     try{
         if (!name ||!photo || !email) {
             throw new Error("Error, todos los campos deben ser completados");
         }
         const user = {
             name,
             photo,
             email
         }
         user.id = UserManager.idUser++
         this.users.push(user)
 
         await fs.promises.writeFile(
             this.ruta, JSON.stringify(this.users, null, '\t') );
     }
     catch(error){
         console.log(error.mensaje)
     }
 
    }
     async readUsers(){
     try {
         const readUsers = await fs.promises.readFile('./users.json') 
         const searchUsers = JSON.parse(readUsers)
         console.log('searchUsers',searchUsers)
         return searchUsers
         
     } 
     catch (error) {
         console.log(error.mensaje)
     }
         
    }
    async readOneUser(id) {
     try{
 
         const readUsers = await fs.promises.readFile('./users.json') 
         const searchUsers = JSON.parse(readUsers)
         const searchId = await searchUsers.find((user) => user.id === id);
         if (!searchId) {
         throw new Error("Error, no se encontró el usuario con el ID asignado");
         }
         console.log('readOneUser:',searchId)
         return searchId;
     }
     catch(error){
         console.log(error.mensaje)
     }
   }
 }
 // star : call methods User
 const startProcessUsers =async ()=>{
     const manager =  new UserManager('./users.json')
     await manager.createDataUser('fede','photo',50)
     await manager.createDataUser('edu','photo',100)
     await manager.createDataUser('yesi','photo',200)
     await manager.readUsers()
     await manager.readOneUser(2)
 }
 startProcessUsers()