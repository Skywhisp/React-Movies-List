import ReactDOM from 'react-dom/client'
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
)
