import express from 'express';
import {Socket} from 'socket.io';
import 'dotenv/config';
import { getMessageManager } from './dao/daoManager.js';

const app = express();
const messageManager = new getMessageManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 8080)

const server = app.listen(app.get('port'), () => {
    console.log(console.log(`Server on port ${app.get("port")}`))
})

const io = Socket(server)

io.on('connection', socket => {
    socket.on('new-message', data => {
        managerMessage.addElements([info]).then(() => {
            managerMessage.getElements().then(messages => {
                console.log(messages)
                socket.emit('get-messages', messages)
            })
        })

    })
})
