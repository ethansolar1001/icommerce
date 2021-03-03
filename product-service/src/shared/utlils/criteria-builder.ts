import {
  LessThan,
  Like,
  MoreThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  Between,
} from 'typeorm'
import * as _ from 'lodash'
import { BadRequestException } from '@nestjs/common'
import { FILTER_OPERATOR } from '../constants'

export class CriteriaBuilder {
  private search: any
  private filter: any
  private sort: any

  addSearch(search: any): this {
    this.search = search
    return this
  }

  addFilter(filter: any): this {
    this.filter = filter
    return this
  }

  addSort(sort: any): this {
    this.sort = sort
    return this
  }

  build(): any {
    const searchCriteria = this.buildSearch() || {}
    const filterCriteria = this.buildFilter() || {}
    const sortCriteria = this.buildSort() || {}
    return {
      where: Object.assign({}, searchCriteria, filterCriteria),
      order: sortCriteria,
    }
  }

  private buildSearch() {
    if (!this.search) return
    return _.reduce(
      this.search,
      (result, val, key) => {
        let operator
        const searchObj = _.isString(val) ? { contains: val } : val
        const searchOp = Object.keys(searchObj)[0]
        const searchVal = searchObj[searchOp]
        switch (searchOp) {
          case 'starts_with':
            operator = Like(`${searchVal}%`)
            break
          case 'end_with':
            operator = Like(`%${searchVal}`)
            break
          case 'contains':
            operator = Like(`%${searchVal}%`)
            break
        }

        result[key] = operator
        return result
      },
      {},
    )
  }

  private buildFilter() {
    if (!this.filter) return
    return _.reduce(
      this.filter,
      (result, val, key) => {
        let operator
        const filterOp = Object.keys(val)[0]
        const filterVal = val[filterOp]
        switch (filterOp) {
          case FILTER_OPERATOR.LT:
            operator = LessThan(filterVal)
            break
          case FILTER_OPERATOR.GT:
            operator = MoreThan(filterVal)
            break
          case FILTER_OPERATOR.LTE:
            operator = LessThanOrEqual(filterVal)
            break
          case FILTER_OPERATOR.GTE:
            operator = MoreThanOrEqual(filterVal)
            break
          case FILTER_OPERATOR.BTW:
            {
              const btwArr = _.toString(filterVal || '')
                .replace(/\[|\]/g, '')
                .split(',')
              if (!btwArr && btwArr.length !== 2)
                throw new BadRequestException(`Invalid between operator`)
              operator = Between(btwArr[0], btwArr[1])
            }
            break
        }

        result[key] = operator
        return result
      },
      {},
    )
  }

  private buildSort() {
    if (!this.sort) return
    return _.reduce(
      this.sort,
      (result, operator: any, key: any) => {
        result[key] = _.toUpper(operator)
        return result
      },
      {},
    )
  }
}
