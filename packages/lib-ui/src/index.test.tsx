import { render, screen } from '@testing-library/react'
import { SimpleComponent } from './index.js'

describe('SimpleComponent', () => {
  it('should render', () => {
    render(<SimpleComponent />)
    expect(screen.getByText('Hello world! From lib-ui')).toBeTruthy()
  })
})
