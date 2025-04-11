// src/main/etiquetas.ts
import { client } from "./db"

interface Etiqueta {
  id: number
  nome: string
  quantidade: number
  tamanho: string
}

export async function getEtiquetas(): Promise<Etiqueta[]> {
  const res = await client.query(`SELECT id, nome, quantidade, tamanho FROM public."Etiqueta" ORDER BY nome ASC;`)
  return res.rows
}

export async function updateEtiqueta(id: number, quantidade: number): Promise<void> {
  await client.query(`UPDATE public."Etiqueta" SET quantidade = $1 WHERE id = $2`, [quantidade, id])
}
