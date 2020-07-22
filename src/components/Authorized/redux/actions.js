import { getMenu, getInfo } from '@api/acl/login'
import { GET_USER_INFO, GET_MENU } from './constans'

const getUserInfoSync = user => ({
  type: GET_USER_INFO,
  data: user
})

export const getUserinfo = () => {
  return dispatch => {
    return getInfo().then(response => {
      dispatch(getUserInfoSync(response))
      return response
    })
  }
}

const getMenuSync = permissionList => ({
  type: GET_MENU,
  data: permissionList
})

export const getMenu1 = () => {
  return dispatch => {
    return getMenu().then(response => {
      dispatch(getMenuSync(response.permissionList))
      return response.permissionList
    })
  }
}
