import request from '@utils/request'

const BASE_URL = '/admin/edu/subject'

// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取课程分类
export function reqGetSubjectList(page, limit) {
  //返回一个promise
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET'
  })
}

// 获取二级课程分类
export function reqGetSecSubjectList(parentId) {
  console.log(parentId)
  //返回一个promise
  return request({
    // /admin/edu/subject/get/:parentId
    url: `${BASE_URL}/get/${parentId}`,
    method: 'GET'
  })
}

//添加课程分类
export function reqAddSecSubjectList(title, parentId) {
  // console.log(parentId)
  //返回一个promise
  return request({
    // /admin/edu/subject/get/:parentId
    url: `${BASE_URL}/save`,
    method: 'POST',
    data: {
      title,
      parentId
    }
  })
}

export function reqDelSubjectList(id) {
  return request({
    url: `${BASE_URL}/remove/:id`,
    method: 'DELETE',
    data: id
  })
}

//定义修改课程分类title的方法
export function reqUpdateSecSubjectList(id, title) {
  // console.log(parentId)
  //返回一个promise
  return request({
    // /admin/edu/subject/get/:parentId
    url: `${BASE_URL}/update`,
    method: 'PUT',
    data: {
      id,
      title
    }
  })
}
