import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import React from 'react'

import './app.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import AppLayout from './shared/App'

createInertiaApp({
    resolve: (name) => require(`./pages/${name}`),
    setup({ el, App, props }) {
        createRoot(el).render(
            <AppLayout>
                <App {...props} />
            </AppLayout>
        )
    },
})
