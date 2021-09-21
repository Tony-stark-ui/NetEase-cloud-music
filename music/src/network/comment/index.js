import { request } from '@/utils/request'

// 歌单评论
export const getSongsComment = (id, limit, offset) => {
  return request({
    url: '/comment/playlist/',
    params: {
      id,
      limit,
      offset
    }
  })
}

// 发布评论
export function sendCommend(cookie, id, content) {
  return request({
    url: '/comment',
    params: {
      cookie: cookie,
      t: 1,
      type: 2,
      id: id,
      content: content,
    }
  })
}

// 获取歌单收藏者
export function getSub(id) {
  return request({
    url: '/playlist/subscribers',
    params: {
      id: id,

    }
  })
}

/**获取歌词 */
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id: id
    }
  })
}

/**歌曲评论 */
export function musicRecommend(id, limit, offset) {
  return request({
    url: '/comment/music',
    params: {
      id: id,
      limit: limit,
      offset
    }
  })
}