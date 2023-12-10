import React, { useEffect, useState } from 'react'

import api from '../services/api'
import socket from '../services/socket'
import Folder from './Folder'
import File from './File'

export default () => {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [actualFolder, setActualFolder] = useState(null)
    const [navigation, setNavigation] = useState([])
    const [selected, setSelected] = useState(null)

    const fetchRoot = async () => {
        const { data } = await api.get('/folders/root')

        setFiles([...data.files])
        setFolders([...data.folders])
        setActualFolder(data)
        setNavigation([data])

        socket.emit('open:folder', data.id)

        return data
    }

    /**
     * Files
     */
    const handleFileInput = async (e) => {
        const formData = new FormData()
        const fileList = e.target.files

        for (var i = 0; i < fileList.length; i++) {
            formData.append('files[]', fileList[i])
        }

        await api.post(`/folders/${actualFolder.id}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    /**
     * Folders
     */
    const handleOpenFolder = (folder) => {
        const folderI = navigation.findIndex((f) => f.id === folder.id)

        if (folderI === 0) {
            setNavigation([navigation[0]])
        } else if (folderI !== -1) {
            setNavigation(navigation.filter((_, i) => i <= folderI))
        } else {
            setNavigation((prev) => [...prev, folder])
        }

        socket.emit('open:folder', folder.id)
    }

    const handleCreateFolder = async () => {
        const name = prompt('Digite o nome da pasta:')

        if (name) {
            api.post(`/folders${actualFolder ? `/${actualFolder.id}` : ''}`, { name })
        }
    }

    /**
     * Delete
     */
    const handleDelete = () => {
        const route =
            selected.type === 'folder' ? `/folders/${selected.id}` : `/files/${selected.id}`

        api.delete(route)
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

        socket.on('deleted:folder', (folder) => {
            setFolders((prev) => prev.filter((f) => f.id !== folder.id))
        })

        socket.on('upload', (files) => {
            setFiles((prev) => [...prev, ...files])
        })
    }, [])

    return (
        <div className="explorer-container">
            <input type="file" onChange={handleFileInput} multiple />
            <br />
            <button onClick={handleCreateFolder}>Criar Pasta</button>
            <br />
            <button onClick={handleDelete}>Excluir</button>
            <br />
            <a href="/logout">Sair da conta</a>
            <ul className="navigation">
                {navigation.map((folder) => (
                    <li>
                        <a href="#" onClick={() => handleOpenFolder(folder)}>
                            {folder.name}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="explorer">
                {/* <h2>Pastas: </h2>
                <ul> */}
                {folders.map((folder) => (
                    <Folder
                        key={folder.id}
                        selected={
                            selected && selected.type === 'folder' && selected.id === folder.id
                        }
                        onSelect={() => setSelected({ type: 'folder', id: folder.id })}
                        onOpen={() => handleOpenFolder(folder)}
                        name={folder.name}
                    />
                    // <li key={folder.id} onClick={() => handleOpenFolder(folder.id)}>
                    //     {folder.name}
                    // </li>
                ))}
                {/* </ul>
                <h2>Arquivos: </h2>
                <ul> */}
                {files.map((file) => (
                    <File
                        key={file.id}
                        onSelect={() => setSelected({ type: 'file', id: file.id })}
                        selected={selected && selected.type === 'file' && selected.id === file.id}
                        name={file.client_name}
                    />
                ))}
                {/* </ul> */}
            </div>
        </div>
    )
}
