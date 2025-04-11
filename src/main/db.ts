// src/main/db.ts
import { Client } from "pg"

export const client = new Client({
  host: "elo.chmqai2c0hst.sa-east-1.rds.amazonaws.com",
  port: 5432,
  user: "elosolutions",
  password: "EloSolutions.24",
  database: "elosolutions",
  ssl: false // ⚠️ importante
})

export async function connectToDB(): Promise<void> {
  try {
    await client.connect()
    console.log("Conectado ao PostgreSQL!")
  } catch (err) {
    console.error("Erro ao conectar no PostgreSQL:", err)
  }
}
