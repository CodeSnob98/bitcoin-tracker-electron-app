// var audio = new Audio('you_suffer.mp3');
// audio.play();
const {app,BrowserWindow,Menu,Notification}= require('electron');

process.env.NODE_ENV='development'
// process.env.NODE_ENV='production'
const isDev=process.env.NODE_ENV ==="development"? true:false;
const isWindow=process.platform ==="win32"? true:false;
let mainWindow;
let setValueWindow;

function forMainPage(){
    mainWindow=new BrowserWindow({title:"Bitcoin Monitor",height:500,width:800,resizable:false,icon:"./assets/styles/icons/bitIcon.png",webPreferences:{nodeIntegration:true,contextIsolation: false}})
    mainWindow.loadFile("./app/index.html")
}
const menu=[
    {
        label:"Tools",
        submenu:[
            {
                label:"Quit",
                accelerator: isWindow? "Ctrl+Q":"Cmd+Q",
                click(){
                    app.quit()
                }
            }
        ]
    },
    ...(isDev?[ {
        label: 'For Developers',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },]:[])
]
app.on("ready",()=>{
    forMainPage()
    const mainMenu=Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on("close",()=>{
        app.quit();
        mainWindow=null;
        setValueWindow=null;
    })
})