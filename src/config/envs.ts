import { z } from 'zod';

// Definimos el esquema de validación
const envSchema = z.object({
  API_URL: z.string().url({ message: "La API_URL debe ser una URL válida" }),
  // Puedes agregar más aquí, por ejemplo:
  // API_KEY: z.string().min(10),
});

// Validamos las variables de entorno actuales
// En Astro se accede via import.meta.env
const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error("❌ Error en las variables de entorno:", _env.error.format());
  throw new Error("Variables de entorno inválidas");
}

// Exportamos los datos validados y con tipado automático
export const env = _env.data;