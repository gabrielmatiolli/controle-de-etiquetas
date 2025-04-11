import { app, BrowserWindow, ipcMain, shell } from "electron"
import { join } from "path"
import { electronApp, is, optimizer } from "@electron-toolkit/utils"
import icon from "../../resources/icon.png?asset"
import * as dotenv from "dotenv"
import { getEtiquetas, updateEtiqueta } from "./etiquetas"
import { connectToDB } from "./db"

dotenv.config({ path: join(process.cwd(), ".env") })

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    },
    icon: icon
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId("com.elosolutions")
  await connectToDB()

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle("get-etiquetas", async () => {
    return await getEtiquetas()
  })

  ipcMain.handle("update-etiqueta", async (_, id: number, quantidade: number) => {
    return await updateEtiqueta(id, quantidade)
  })

  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
