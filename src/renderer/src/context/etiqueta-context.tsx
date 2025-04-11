import React, { createContext, useContext, useEffect, useState } from "react"

type EtiquetaContextType = {
  etiquetas: Etiqueta[]
  fetchEtiquetas: () => Promise<void>
}

const EtiquetaContext = createContext<EtiquetaContextType | undefined>(undefined)

export const EtiquetaProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])

  const fetchEtiquetas = async (): Promise<void> => {
    const data = await window.api.getEtiquetas()
    setEtiquetas(data)
  }

  useEffect(() => {
    fetchEtiquetas()
  }, [])

  return (
    <EtiquetaContext.Provider value={{ etiquetas, fetchEtiquetas }}>
      {children}
    </EtiquetaContext.Provider>
  )
}

export const useEtiquetas = (): EtiquetaContextType => {
  const context = useContext(EtiquetaContext)
  if (!context) throw new Error("useEtiquetas must be used within EtiquetaProvider")
  return context
}
