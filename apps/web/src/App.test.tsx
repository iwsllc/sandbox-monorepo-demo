import { render, screen } from '@testing-library/react'
import { App } from './App.js'

vi.mock('@potatoes/lib-ui', () => ({
  SimpleComponent: () => <span data-testid="simple" />,
}))

describe('App', () => {
  it('should render', () => {
    render(<App />)
    expect(screen.getByText('Hello world')).toBeTruthy()
    expect(screen.getByTestId('simple')).toBeTruthy()
  })
})
