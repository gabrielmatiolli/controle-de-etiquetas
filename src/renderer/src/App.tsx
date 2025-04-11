import React, { useEffect } from "react"
import logo from "@/assets/logo.svg"
import EtiquetaComponent from "@/components/etiqueta"
import { useEtiquetas } from "@/context/etiqueta-context"

function App(): React.JSX.Element {
  const { etiquetas, fetchEtiquetas } = useEtiquetas()

  useEffect(() => {
    fetchEtiquetas()
  }, [])
  return (
    <div className={"w-full h-screen flex items-center justify-start flex-col gap-6 p-10"}>
      <img alt={"Logo"} className={"w-4/5 h-auto"} src={logo} />
      <h1 className={"font-bold text-3xl w-full text-center"}>Controle de Etiquetas</h1>

      <div className={"w-full flex flex-col gap-6"}>
        {etiquetas.map((etiqueta: Etiqueta, index: number) => (
          <EtiquetaComponent key={index} {...etiqueta} />
        ))}
      </div>
    </div>
  )
}

export default App
