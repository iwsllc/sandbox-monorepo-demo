import { add } from '@potatoes/lib-main'
import { slippers } from '@potatoes/lib-main/pink/fluffy/slippers'

export const work = () => {
  return `slippers should be ${slippers()};\n1 + 2 = ${add(1, 2)}; should be 3`
}
