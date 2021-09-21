import { request } from '@/utils/request'

//轮播图
export const banner = () => {
  return request({
    url: '/banner'
  })
}

// 推荐歌单数据
export const getRecommend = (limit) => {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  })
}

// 独家放送
export const Exclusive = () => {
  return request({
    url: '/personalized/privatecontent'
  })
}

// 每日新歌
export const getNewMusic = () => {
  return request({
    url: '/personalized/newsong'
  })
}