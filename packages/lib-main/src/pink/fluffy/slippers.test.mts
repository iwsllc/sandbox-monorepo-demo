import { slippers } from './slippers.mjs'

describe('slippers', () => {
  it('should return pink', () => {
    expect(slippers()).toBe('pink')
  })
})
