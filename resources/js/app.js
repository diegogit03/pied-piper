import { createRoot } from 'react-dom/client'
import React from 'react'

import Explorer from './components/Explorer'
import AppLayout from './shared/App'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)
root.render(
    <AppLayout>
        <Explorer />
    </AppLayout>
)
