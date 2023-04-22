import React, { useEffect, useState } from 'react'

import api from '../services/api'
import socket from '../services/socket'

export default () => {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [actualFolder, setActualFolder] = useState(null)

  const fetchRoot = async () => {
    const { data } = await api.get('/folders/root')

    setFiles([...data.files])
    setFolders([...data.folders])

    socket.emit('open:folder', data.id)

    return data
  }

  /**
   * Files
   */
  const handleFileInput = async (e) => {
    const formData = new FormData()
    formData.append('files', e.target.files)

    await api.post(`/folders/${actualFolder.id}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  /**
   * Folders
   */
  const handleOpenFolder = (id) => {
    socket.emit('open:folder', id)
  }

  const handleCreateFolder = async () => {
    const name = prompt('Digite o nome da pasta:')

    if (name) {
      api.post(`/folders${actualFolder ? `/${actualFolder.id}` : ''}`, { name })
    }
  }

  useEffect(() => {
    fetchRoot()

    socket.on('opened:folder', (folder) => {
      setFiles([...folder.files])
      setFolders([...folder.folders])
      setActualFolder(folder)
    })

    socket.on('created:folder', (folder) => {
      setFolders((prev) => [...prev, folder])
    })
  }, [])

  return (
    <>
      <input type="file" onChange={handleFileInput} />
      <br />
      <button onClick={handleCreateFolder}>Criar Pasta</button>
      <h2>Pastas: </h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id} onClick={() => handleOpenFolder(folder.id)}>
            {folder.name}
          </li>
        ))}
      </ul>
      <h2>Arquivos: </h2>
      <ul>
        {files.map((file) => (
          <li>{file.name}</li>
        ))}
      </ul>
    </>
  )
}
