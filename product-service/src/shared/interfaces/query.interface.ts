import { ORDER_BY, SEARCH_OPERATOR } from '../constants'

export interface IQuery<Dto> {
  search?: {
    [key: string]: SEARCH_OPERATOR
  }
  filter?: Dto
  sort?: {
    [key: string]: ORDER_BY
  }
}
