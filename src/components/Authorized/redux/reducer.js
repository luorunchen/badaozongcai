import { GET_USER_INFO, GET_MENU } from './constans'

const initUser = {
  name: '', //用户名
  avatar: '', //头像
  permissionValueList: [], // 按钮权限列表
  permissionList: [] // 路由权限列表
}

export default function user(pervState = initUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...pervState,
        ...action.data
      }
    case GET_MENU:
      return {
        ...pervState,
        permissionList: action.data
      }
    default:
      return pervState
  }
}
