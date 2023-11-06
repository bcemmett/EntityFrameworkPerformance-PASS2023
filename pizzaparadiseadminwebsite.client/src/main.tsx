import ReactDOM from 'react-dom/client'
import TabLayout from './components/TabLayout.tsx'
import HeaderBar from './components/HeaderBar.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <HeaderBar />
    <TabLayout />
  </>,
)