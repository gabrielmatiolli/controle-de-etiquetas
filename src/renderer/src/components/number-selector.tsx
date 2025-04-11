import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"

type NumberSelectorProps = {
  onChange: (value: number) => void
  value: number
  max?: number // max pode ser undefined (para entrada)
}

function NumberSelector({ value, onChange, max }: NumberSelectorProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState(String(value))

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleBlur = (): void => {
    const val = parseInt(inputValue, 10)
    if (!isNaN(val)) {
      const boundedValue = Math.max(1, max !== undefined ? Math.min(val, max) : val)
      onChange(boundedValue)
    } else {
      setInputValue(String(value)) // volta pro valor anterior se inválido
    }
  }

  return (
    <div className="flex justify-center gap-4 border border-border w-fit m-auto rounded-md px-2 py-1">
      <Button disabled={value <= 1} variant="ghost" onClick={() => onChange(value - 1)}>
        <Minus />
      </Button>

      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-16 text-center font-bold text-2xl bg-transparent outline-none"
        min={1}
        max={max}
      />

      <Button
        disabled={max !== undefined && value >= max}
        variant="ghost"
        onClick={() => onChange(value + 1)}
      >
        <Plus />
      </Button>
    </div>
  )
}

export default NumberSelector
