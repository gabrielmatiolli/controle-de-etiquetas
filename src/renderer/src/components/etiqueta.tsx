import React from "react"
import RegistrarMovimentacao from "./registrar-movimentacao"

type EtiquetaProps = Etiqueta

function EtiquetaComponent(props: EtiquetaProps): React.JSX.Element {
  return (
    <div
      className={"w-full rounded-md shadow-sm p-4 flex flex-row items-center justify-between gap-6"}
    >
      <div className={"grow-1"}>
        <p className={"font-bold text-lg"}>Etiqueta {props.nome}</p>
        <p>{props.tamanho}</p>
      </div>
      <p className={"font-bold text-2xl"}>{props.quantidade}</p>
      <div className={"flex justify-center items-stretch flex-col gap-2"}>
        <RegistrarMovimentacao id={props.id} quantidade={props.quantidade} tipo="entrada" />
        <RegistrarMovimentacao id={props.id} quantidade={props.quantidade} tipo="saida" />
      </div>
    </div>
  )
}

export default EtiquetaComponent
