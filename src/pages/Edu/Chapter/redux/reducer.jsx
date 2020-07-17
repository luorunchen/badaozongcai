import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'
import Chapter from '..'

const initChapterList = {
  total: 0,
  items: []
}

export function chapterList(pervState = initChapterList, action) {
  switch (action.type) {
    case GET_CHAPTER_LIST:
      // console.log(action.data)
      action.data.items.forEach(item => {
        item.children = []
      })
      // console.log(action.data, '13')
      return action.data
    case GET_LESSON_LIST:
      //将课时添加到对应的章节action

      // 1-->从返回的数据中拿chapterId
      if (action.data.length > 0) {
        const chapterId = action.data[0].chapterId
        //如果没有数据,将数据加到children
        pervState.items.forEach(chapter => {
          if (chapter._id === chapterId) {
            chapter.children = action.data
          }
        })
      }
      return { ...pervState }
    default:
      return pervState
  }
}
