import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  GET_UPDATESUBJECT_LIST
} from './constants'

const initSubjectList = {
  total: 0, // 总数
  items: [] // 详细user数据
}

export default function subjectList(prevState = initSubjectList, action) {
  // console.log(action, initSubjectList)
  switch (action.type) {
    case GET_SUBJECT_LIST:
      //实现二级课程分类,需要給items添加一个children属性
      action.data.items.forEach(item => {
        item.children = []
      })
      // console.log(action.data.items)
      return action.data
    case GET_SECSUBJECT_LIST:
      //把二级分类数据添加到一级分类的children数据上
      // console.log(action)
      // 1-->获取一级分类的id
      if (action.data.items.length > 0) {
        const parentId = action.data.items[0].parentId

        //找到相应的一级分类数据
        prevState.items.forEach(item => {
          // 找到对应的一级分类

          if (item._id === parentId) {
            item.children = action.data.items
          }
        })
      }
      return { ...prevState }
    case GET_UPDATESUBJECT_LIST:
      //通过prevstate,传过来的id,修改title
      prevState.items.forEach(subject => {
        //传过来的ID是不是一级课程分类
        // console.log(action)
        if (subject._id === action.data._id) {
          subject.title = action.data.title
          return
        }
        //遍历二级分类ID
        subject.children.forEach(secsubject => {
          if (secsubject._id === action.data.id) {
            secsubject.title = action.data.title
            return
          }
        })
      })
      return { ...prevState }

    default:
      return prevState
  }
}
