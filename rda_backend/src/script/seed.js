import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
    try {
        
  
 const existUser = await prisma.user.findUnique({
    where:{
        username: "admin"
    }
 }) 

 if(!existUser){
     const salt = bcrypt.genSaltSync(10);
     const hashPassword =  bcrypt.hashSync(process.env.SECRET_KEY, salt)  //la password sera el secret_key que se utilizo en el .env
     await prisma.user.create({
         data:{
             username: "admin",
             name: "Administrador",
             password: hashPassword,
             rolUser: "ADMIN"
         }
 })
  console.log('Usuario administrador creado.');
}else{
    console.log('El Usuario administrador ya existe.');
}

  } catch (error) {
        console.error(error);
    }finally{
        await prisma.$disconnect()
    }
}

seed()
