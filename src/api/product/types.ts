export interface ProductItem {
  id: number
  sku: string
  woocommerce_id: number
  type: 'simple' | 'variable' | 'variation'
  parent_id: number
  name: string
  status: 'draft' | 'pending' | 'publish'
  featured: boolean
  description: string
  short_description: string
  price: string
  regular_price: string | null
  sale_price: string | null
  meta_data: Record<string, any>
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock'
  category_id: number
  tags: string[]
  images: string[]
  attributes: Array<{
    id: number
    name: string
    slug: string
    option: string[]
  }> | null
  created_at: string
  updated_at: string
}

export interface ProductListResponse {
  current_page: number
  data: ProductItem[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
