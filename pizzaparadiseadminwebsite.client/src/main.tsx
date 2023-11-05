import React from 'react'
import ReactDOM from 'react-dom/client'
import TabLayout from './TabLayout.tsx'
import HeaderBar from './HeaderBar.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeaderBar />
    <TabLayout />
  </React.StrictMode>,
)