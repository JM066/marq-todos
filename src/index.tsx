import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal'
import Layout from './component/Layout/index'
import App from './pages/App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import './styles.css'

if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser')
    worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
Modal.setAppElement('#root')
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout>
                <App />
            </Layout>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
