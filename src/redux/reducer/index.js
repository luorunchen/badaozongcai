import { combineReducers } from 'redux'

import loading from './loading'
import token from './login'

import user from '@comps/Authorized/redux/reducer'
import { userList } from '@pages/Acl/User/redux'
import { roleList } from '@pages/Acl/Role/redux'
import { menuList } from '@pages/Acl/Permission/redux'

// 增加的subject和chapter
import { subjectList } from '@pages/Edu/Subject/redux'
import { chapterList } from '@pages/Edu/Chapter/redux'

export default combineReducers({
  loading,
  user,
  token,
  userList,
  roleList,
  menuList,
  subjectList,
  chapterList
})
