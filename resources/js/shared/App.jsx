import React from 'react'
import Sidebar from './components/Sidebar'

export default (props) => (
    <div class="container-fluid">
        <div class="row">
            <Sidebar />
            <div class="col-sm p-3 min-vh-100">{props.children}</div>
        </div>
    </div>
)
