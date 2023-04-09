import { createRoot } from 'react-dom/client'
import React from 'react'
import Hello from './hello'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)
root.render(<Hello />)
