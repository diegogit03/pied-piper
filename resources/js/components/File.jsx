import React from 'react'

export default ({ name, onSelect, selected }) => {
    return (
        <div
            onClick={onSelect}
            className={`folder col-6 col-sm-4 col-md-3 col-lg-2 ${selected ? 'selected' : ''}`}
        >
            <div className="folder-header">
                <i class="bi bi-file-earmark-fill text-success"></i>

                <span>{name}</span>
            </div>
        </div>
    )
}
