import React from 'react';
import Sidebar from './components/Sidebar';

export default (props) => (
    <div className="container">
        <Sidebar />
        <div className="content">
            {props.children}
        </div>
    </div>
)
