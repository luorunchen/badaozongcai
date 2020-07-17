import { GET_CHAPTER_LIST, GET_LESSON_LIST } from './constant'
import { reqGetCourseList } from '@api/edu/chapter'
import { reqGetLessonList } from '@api/edu/leeson'

// 同步章节actions
function getChapterListSync(data) {
  return { type: GET_CHAPTER_LIST, data }
}
//异步章节actions
export function getChapterList({ page, limit, courseId }) {
  return dispatch => {
    return reqGetCourseList({ page, limit, courseId }).then(res => {
      dispatch(getChapterListSync(res))
      return res
    })
  }
}

//获取章节课时同步action
function getLessonListSync(data) {
  return { type: GET_LESSON_LIST, data }
}
//获取章节课时异步action
export function getLessonList(chapterId) {
  return dispatch => {
    return reqGetLessonList(chapterId).then(res => {
      dispatch(getLessonListSync(res))
      return res
    })
  }
}
