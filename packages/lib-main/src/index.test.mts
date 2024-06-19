import { add } from './index.mjs'

describe('index', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(1, 2)).to.eq(3)
    })
  })
})
