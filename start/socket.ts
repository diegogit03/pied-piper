import Folder from 'App/Models/Folder'
import Ws from 'App/Services/Ws'
Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('open:folder', async (id) => {
    const folder = await Folder.findOrFail(id)
    await folder.load('files')
    await folder.load('folders')

    socket.emit('opened:folder', folder)
    socket.join(`folder:${id}`)
  })
})
