import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { SimpleComponent } from '@potatoes/lib-ui'
import './stylesheets/index.css'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<StrictMode>
		<div className="p-5">
			<h1 className="font-light text-3xl leading-9">Hello world</h1>
			<SimpleComponent />
		</div>
	</StrictMode>
)