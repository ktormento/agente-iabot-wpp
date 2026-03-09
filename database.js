import mongoose from "mongoose";

export async function connectDB() {
  try {

    if (!process.env.MONGO_URI) {
      throw new Error("Falta la variable de entorno MONGO_URI");
    
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  
} catch (error) {

    console.error("Error MongoDB:", error);
    throw error;

}

}