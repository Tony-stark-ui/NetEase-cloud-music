import { request } from '@/utils/request'

/**获取排行榜数据 */
export function _getRankList() {
  return request({
    url: '/toplist',
  })
}