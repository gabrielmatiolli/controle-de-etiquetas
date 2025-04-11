import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import NumberSelector from "@/components/number-selector"
import { toast } from "sonner"
import { useEtiquetas } from "@/context/etiqueta-context"
import { TriangleAlert } from "lucide-react"

type MovimentacaoProps = {
  id: number
  quantidade: number
  tipo: "entrada" | "saida"
}

function RegistrarMovimentacao({ id, quantidade, tipo }: MovimentacaoProps): React.JSX.Element {
  const [number, setNumber] = useState(1)
  const { fetchEtiquetas } = useEtiquetas()

  const isEntrada = tipo === "entrada"
  const texto = isEntrada ? "Entrada" : "Saída"

  const handleConfirm = async (): Promise<void> => {
    const novaQuantidade = isEntrada ? quantidade + number : quantidade - number
    if (novaQuantidade < 0) {
      toast.error("A quantidade não pode ser negativa")
      return
    }

    await window.api.updateEtiqueta(id, novaQuantidade).then(() => {
      fetchEtiquetas().then(() => {
        toast(`${texto} registrada com sucesso`)
      })
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={tipo === "entrada" ? "outline" : "default"} className={"w-full"}>
          {texto}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Registrar {texto}</AlertDialogTitle>
          <AlertDialogDescription>
            Registrar uma quantidade que está {isEntrada ? "entrando" : "saindo"} de etiquetas
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* AVISO se quantidade estiver baixa */}
        {quantidade < 15 && (
          <div className="flex items-center gap-2 p-3 bg-yellow-100 text-yellow-800 rounded-md border border-yellow-300 text-sm mb-2">
            <TriangleAlert className="w-4 h-4" />
            Estoque baixo: apenas {quantidade} etiquetas disponíveis.
          </div>
        )}
        <NumberSelector
          value={number}
          onChange={setNumber}
          max={tipo === "saida" ? quantidade : undefined}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Voltar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RegistrarMovimentacao
