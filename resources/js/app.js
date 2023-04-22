import { createRoot } from 'react-dom/client'
import React from 'react'

import Explorer from './components/Explorer'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)
root.render(<Explorer />)
