import { request } from '@/utils/request'

import { time } from '@/utils/dayjs'

// 歌单详情
export const getDetail = (id) => {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

/**获取歌单歌曲信息 */
export function _getSongsDetail(arr) {
  return request({
    url: '/song/detail',
    params: {
      ids: arr
    }
  })
}
/**对歌曲数据进行封装 */
export class songDetail {
  constructor(songs) {
    this.id = songs[0].id;
    this.name = songs[0].name;
    this.album = songs[0].al.name;
    this.artist = songs[0].ar[0].name;
    this.pic = songs[0].al.picUrl;
    this.time = time(songs[0].dt);
    // this.icon = `<i class="el-icon-star-off"></i>
  }
}

// 获取音乐url
export function getSongURl(id) {
  return request({
    url: '/song/url',
    params: {
      id: id
    }
  })
}
