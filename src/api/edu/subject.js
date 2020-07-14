import request from "@utils/request";

const BASE_URL = '/admin/edu/subject'

// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取讲师
export function reqGetSubjectList (page, limit) {
  //返回一个promise
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET"
  })
}

