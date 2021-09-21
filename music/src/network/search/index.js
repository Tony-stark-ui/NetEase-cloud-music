import { request } from '@/utils/request'

// 热搜列表
export const getHostSearch = () => {
  return request({
    url: '/search/hot/detail'
  })
}

/**搜索 */
export function _Search(keyword, type) {
  return request({
    url: '/search',
    params: {
      keywords: keyword,
      type
    }
  })
}

// 搜索建议
export const searchSucess = (keywords) => {
  return request({
    url: '/search/suggest',
    params: {
      keywords: keywords
    }
  })
}