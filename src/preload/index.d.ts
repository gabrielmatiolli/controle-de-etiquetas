import { ElectronAPI } from "@electron-toolkit/preload"

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getEtiquetas: () => Promise<Etiqueta[]>
      updateEtiqueta: (id: number, quantidade: number) => Promise<Etiqueta>
    }
  }

  interface Etiqueta {
    id: number
    nome: string
    tamanho: string
    quantidade: number
  }
}
