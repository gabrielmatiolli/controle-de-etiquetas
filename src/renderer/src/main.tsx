import "@/assets/main.css"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { EtiquetaProvider } from "@/context/etiqueta-context"
import { Toaster } from "@/components/ui/sonner"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EtiquetaProvider>
      <App />
      <Toaster />
    </EtiquetaProvider>
  </React.StrictMode>
)
