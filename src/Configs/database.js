import { PrismaClient } from "@prisma/client";
import env from "./envConfig.js";

import fs from "fs";

const prisma = new PrismaClient();

const startApp = async () => {
  try {
    await prisma.$connect();
    console.log("Conexión a Postgres establecida con Prisma.");
  } catch (error) {
    console.error("Error al conectar con Prisma:", error.message);
    process.exit(1); // Salida con error
  }
};

// Función para cerrar conexión y eliminar archivo .env
const gracefulShutdown = async () => {
  try {
    await prisma.$disconnect();
    console.log("Desconexión de Prisma completa.");

    // Limpiar el archivo .env generado
    if (fs.existsSync(".env")) {
      await env.cleanEnvFile();
      console.log("Archivo .env eliminado correctamente.");
    }
    setTimeout(() => {
      console.log("Cerrando proceso.");
      process.exit(0); // Salida limpia
    }, 3000);
    //process.exit(0); // Salida limpia
  } catch (error) {
    console.error("Error al desconectar Prisma:", error.message);
    process.exit(1); // Salida con error
  }
};

export {
    prisma,
    startApp,
    gracefulShutdown,
}