import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import React from 'react'

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
