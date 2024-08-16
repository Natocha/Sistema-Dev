const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Crear una ventana
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Simula una base de datos de usuarios
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Maneja el intento de login
ipcMain.on('login-attempt', (event, { username, password }) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        event.reply('login-success', user);
    } else {
        event.reply('login-failure');
    }
});
