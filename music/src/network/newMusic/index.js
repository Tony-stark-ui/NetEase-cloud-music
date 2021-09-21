import { request } from '@/utils/request'

/**最新歌曲 */
export function _getTopSongs(type) {
  return request({
    url: '/top/song',
    params: {
      type: type
    }
  })
}