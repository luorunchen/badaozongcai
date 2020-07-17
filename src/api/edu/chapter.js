import request from '@utils/request'

const BASE_URL = '/admin/edu/chapter'

// 获取所有课程数据
export function reqGetCourseList({ page, limit, courseId }) {
  //返回一个promise
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET',
    params: {
      courseId
    }
  })
}
