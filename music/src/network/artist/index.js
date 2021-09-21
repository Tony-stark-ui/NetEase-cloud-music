import { request } from '@/utils/request'

/**歌手列表 */
export function _getArtist(area, type, initial, limit, offset) {
  return request({
    url: '/artist/list',
    params: {
      area: area,
      type: type,
      limit: limit,
      initial: initial,
      offset: offset
    }
  })
}

// 歌手详情
export const getSingerDetail = (id) => {
  return request({
    url: '/artist/detail',
    params: {
      id: id
    }
  })
}

// 歌手专辑
export const getSingerAblum = (id) => {
  return request({
    url: '/artist/album',
    params: {
      id: id
    }
  })
}

/**获取歌手热门五十首歌曲 */
export function _getArtistHot50(id) {
  return request({
    url: '/artist/top/song',
    params: {
      id: id
    }
  })
}

/**获取专辑内容 */
export function _getAlbum(id) {
  return request({
    url: '/album',
    params: {
      id: id
    }
  })
}


/**获取歌手描述 */
export function _getArtistDescDetail(id) {
  return request({
    url: '/artist/desc',
    params: {
      id: id
    }
  })
}

/**mv */
export function _getArtistMv(id) {
  return request({
    url: '/artist/mv',
    params: {
      id: id
    }
  })
}
// 相似歌手
export const getSimArist = (id) => {
  return request({
    url: '/simi/artist',
    params: {
      id: id
    }
  })
}
