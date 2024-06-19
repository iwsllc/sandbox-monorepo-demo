import { SimpleComponent } from '@potatoes/lib-ui'

export const App = () => {
  return (
    <div className="p-5">
      <h1 className="font-light text-3xl leading-9" data-testid="hello">Hello world</h1>
      <SimpleComponent />
    </div>
  )
}
