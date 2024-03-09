import React from 'react'

export default ({ name, onSelect, selected }) => {
    function handleDownload() {
        const link = document.createElement('a')
        link.href = '/uploads/' + name
        link.setAttribute('download', name)

        document.body.appendChild(link)

        link.click()

        link.parentNode.removeChild(link)
    }

    return (
        <div
            onClick={onSelect}
            onDoubleClick={handleDownload}
            className={`folder col-6 col-sm-4 col-md-3 col-lg-2 ${selected ? 'selected' : ''}`}
        >
            <div className="folder-header">
                <i class="bi bi-file-earmark-fill text-success"></i>

                <span>{name}</span>
            </div>
        </div>
    )
}
