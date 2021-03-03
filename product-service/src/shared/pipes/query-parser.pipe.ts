import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Scope,
  ValidationPipe,
  Type,
} from '@nestjs/common'
import { IQuery } from '../interfaces/query.interface'
import {
  FILTER_OPERATOR,
  FILTER_OPERATORS,
  SEARCH_OPERATORS,
  SORT_TYPES,
} from '../constants'
import * as classValidator from 'class-validator'
import { plainToClass } from 'class-transformer'
import * as _ from 'lodash'

@Injectable({ scope: Scope.REQUEST })
export class QueryParserPipe extends ValidationPipe {
  private dtoType: Type<any>
  constructor(dtoType: Type<any>) {
    super()
    this.dtoType = dtoType
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const queryObj = this.validate(value)
    return queryObj
  }

  protected async validate(value: any): Promise<IQuery<any>> {
    const { search, sort } = value || {}
    const filter = _.omit(value, ['search', 'sort']) || {}
    const dto = plainToClass(this.dtoType, filter, {
      strategy: 'exposeAll',
    })
    const errors = await classValidator.validate(dto, {
      forbidNonWhitelisted: true,
      whitelist: true,
      validationError: {
        target: false,
      },
    })

    if (errors.length > 0) {
      throw this.exceptionFactory(errors)
    }

    this.validateFilter(filter)
    this.validateSearch(search)
    this.validateSort(sort)
    return { search, sort, filter }
  }

  private validateSearch(search: any): void {
    if (!search) return
    _.each(search, (val) => {
      const invalid = _.find(val, (searchVal, operator) => {
        return !_.some([SEARCH_OPERATORS, operator])
      })
      if (invalid) {
        throw new BadRequestException(
          `Search's operator is invalid. Allowed values: ${SEARCH_OPERATORS.join(
            ', ',
          )}`,
        )
      }
    })
  }

  private validateFilter(filter: any): void {
    if (!filter) return
    _.each(filter, (val) => {
      const invalid = _.find(val, (searchVal, operator) => {
        return !_.some([FILTER_OPERATORS, operator])
      })
      if (invalid) {
        throw new BadRequestException(
          `Filter's operator is invalid. Allowed values: ${FILTER_OPERATORS.join(
            ', ',
          )}`,
        )
      }

      const keys = Object.keys(val)
      if (keys && keys.length > 0 && keys[0] == FILTER_OPERATOR.BTW) {
        const btwVal = _.toString(val[keys[0]])
        let btwArray: string[]
        if (btwVal) {
          btwArray = btwVal.replace(/\[|\]/g, '').split(',')
        }

        if (!btwVal || !_.isArray(btwArray)) {
          throw new BadRequestException(
            `Between operator is invalid. Correct format: [btw]=[$min, $max]`,
          )
        }
      }
    })
  }

  private validateSort(sort: any) {
    if (!sort) return
    _.each(sort, (val: any) => {
      const invalid = _.find(val, (sortVal, operator) => {
        return !_.some([SORT_TYPES, operator])
      })
      if (invalid) {
        throw new BadRequestException(
          `Sort's type is invalid. Allowed values: ${SORT_TYPES.join(', ')}`,
        )
      }
    })
  }
}
