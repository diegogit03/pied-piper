import React, { useEffect, useState } from 'react'

import api from '../services/api'
import socket from '../services/socket'
import Folder from './Folder'
import File from './File'

export default ({ initialFolder }) => {
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [actualFolder, setActualFolder] = useState(null)
    const [navigation, setNavigation] = useState([])
    const [selected, setSelected] = useState(null)

    const fetchRoot = async () => {
        setFiles([...initialFolder.files])
        setFolders([...initialFolder.folders])
        setActualFolder(initialFolder)
        setNavigation([initialFolder])

        socket.emit('open:folder', initialFolder.id)
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
            <div className="d-flex justify-content-between">
                <div>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileInput}
                        multiple
                    />
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-success" onClick={handleCreateFolder}>
                        <i class="bi bi-folder-plus"></i>
                        Criar Pasta
                    </button>
                    <button className="btn btn-success" onClick={handleDelete}>
                        <i class="bi bi-trash3"></i>
                        Excluir
                    </button>
                </div>
            </div>
            <ul className="navigation bg-dark p-4 my-4">
                {navigation.map((folder) => (
                    <li>
                        <a
                            href="#"
                            className="text-success"
                            onClick={() => handleOpenFolder(folder)}
                        >
                            {folder.name}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="container">
                <div className="row">
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
                    ))}
                    {files.map((file) => (
                        <File
                            key={file.id}
                            onSelect={() => setSelected({ type: 'file', id: file.id })}
                            selected={
                                selected && selected.type === 'file' && selected.id === file.id
                            }
                            name={file.client_name}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
