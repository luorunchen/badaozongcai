import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getMenu1, getUserinfo } from './redux'

import Loading from '../Loading'

@connect(null, { getUserinfo, getMenu1 })
class Authorized extends Component {
  state = {
    isLodaing: true
  }
  componentDidMount() {
    //请求用户数据+权限数据
    const { getMenu1, getUserinfo } = this.props

    //数据请求中显示lodaing,数据请求完成显示PrimaryLayout组件
    const promises = [getMenu1(), getUserinfo()]

    Promise.all(promises).then(() => {
      // 数据全部请求回来了~
      this.setState({
        isLoading: false
      })
    })
  }
  render() {
    const { isLoading } = this.state

    return isLoading ? <Loading /> : this.props.render()
  }
}
export default Authorized
