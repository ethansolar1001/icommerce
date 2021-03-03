import * as _ from 'lodash'
import { ValueTransformer } from 'typeorm'

export class NumericTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!_.isNil(data)) {
      return data
    }
    return null
  }

  from(data?: string | null): number | null {
    if (!_.isNil(data)) {
      const res = parseFloat(data)
      if (isNaN(res)) {
        return null
      } else {
        return res
      }
    }
    return null
  }
}
