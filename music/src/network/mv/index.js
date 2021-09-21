import { request } from '@/utils/request'

export const getMvDetail = (id) => {
  return request({
    url: '/mv/detail',
    params: {
      mvid: id
    }
  })
}

/**mv地址 */
export function getMVUrl(id) {
  return request({
    url: '/mv/url',
    params: {
      id: id
    }
  })
}

/**mv评论 */
export function getMVComment(id, limit, offset) {
  return request({
    url: '/comment/mv',
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  })
}

/**相似MV */
export function getSimiMv(id) {
  return request({
    url: '/simi/mv',
    params: {
      mvid: id
    }
  })
}

// 封装相似mv信息
export class Mv {
  constructor(id, cover, name, artist, count, duration) {
    this.id = id;
    this.cover = cover;
    this.name = name;
    this.artist = artist;
    this.count = count;
    this.duration = duration
  }
}

// 最新mv
export const getNewMvs = (area, limit) => {
  return request({
    url: '/mv/first',
    params: {
      area: area,
      limit: limit
    }
  })
}

// 推荐mv
export const getRecommendMv = () => {
  return request({
    url: '/personalized/mv'
  })
}

// mv排行榜
export const getRankMv = (area, limit, offset) => {
  return request({
    url: '/top/mv',
    params: {
      area: area,
      limit: limit,
      offset: offset
    }
  })
}

// 全部mv
export const getAllmvs = (area, type, order, limit, offset) => {
  return request({
    url: '/mv/all',
    params: {
      area: area,
      type: type,
      order: order,
      limit: limit,
      offset: offset
    }
  })
}
