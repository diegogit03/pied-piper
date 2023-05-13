import React from 'react';

export default () => {
    return <div className='sidebar'>
        <div id='logo'>
            Pied <span>Piper</span>
        </div>
        <ul>
            <li id='myFiles'>
                <button className='sidebar-button'>
                    <img src='/sidebar/myFilesIcon.svg' />
                    Meus Arquivos
                </button>
            </li>
            <li id='Shared'>
                <button className='sidebar-button'>
                    <img src='/sidebar/sharedIcon.svg' />
                    Compatilhados
                </button>
            </li>
        </ul>

    </div>
}


