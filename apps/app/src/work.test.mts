import { work } from './work.mjs'
describe('work', () => {
  it('should return hard', () => {
    expect(work()).toBe(`slippers should be pink;
1 + 2 = 3; should be 3`)
  })
})
