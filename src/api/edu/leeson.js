//获取课时数据
import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'

// 获取所有课程数据
export function reqGetLessonList(chapterId) {
  //返回一个promise
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET',
    params: {
      chapterId
    }
  })
}
