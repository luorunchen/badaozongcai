import {
  reqGetSubjectList,
  reqGetSecSubjectList,
  reqUpdateSecSubjectList
} from '@api/edu/Subject'

import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  GET_UPDATESUBJECT_LIST
} from './constants'
// import { response } from 'express'

//获取一级分类同步action
const GetSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list
})

// 获取一级分类异步actions
export const GetSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubjectList(page, limit).then(response => {
      dispatch(GetSubjectListSync(response))
      return response
    })
  }
}

// 获取二级分类同步actions
const GetSecSubjectSync = list => ({
  type: GET_SECSUBJECT_LIST,
  data: list
})

//获取二级分类异步actions
export const GetSecSubjectList = parentId => {
  return dispatch => {
    return reqGetSecSubjectList(parentId).then(response => {
      dispatch(GetSecSubjectSync(response))
      return response
    })
  }
}

// 更新课程分类的action
// 同步actions
const GetUpdateSubjectSync = data => ({
  type: GET_UPDATESUBJECT_LIST,
  data: data
})
// 异步actions
export const UpdateSubjectList = (id, title) => {
  return dispatch => {
    return reqUpdateSecSubjectList(id, title).then(response => {
      dispatch(GetUpdateSubjectSync(id, title))
      return response
    })
  }
}

// //同步删除actions
// const GetDelSubjectSync = data => ({
//   type: GET_DELSUBJECT_LIST,
//   data
// })
// //异步删除action
// export const DelSubjectList = id => {
//   return dispatch => {
//     return reqDelSubjectList(id).then(res => {
//       dispatch(GetDelSubjectSync(id))
//       return response
//     })
//   }
// }
