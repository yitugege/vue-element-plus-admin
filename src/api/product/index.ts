import request from '@/axios'
import type { ProductListResponse, ProductItem } from './types'

export const getProductListApi = (params: any) => {
  return request.get<ProductListResponse>({ url: '/api/erp/products', params })
}

export const getProductDetailApi = (id: number) => {
  return request.get<ProductItem>({ url: `/api/erp/products/${id}` })
}
