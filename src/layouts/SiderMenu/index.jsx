import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import Icons from '@conf/icons'
import { defaultRoutes } from '@conf/routes.js'
const { SubMenu } = Menu

@withRouter
@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  //遍历2个数组,动态渲染菜单
  renderMenu = AA => {
    // 1-->遍历传进来的数组
    //返回新的数组出去
    return AA.map(menu => {
      if (menu.hidden) return
      // 通过Icons字符串找到相应的icon组件
      const Icon = Icons[menu.icon]
      console.log(Icon)

      if (menu.children && menu.children.length) {
        //表示有2级菜单
        return (
          <SubMenu key={menu.path} icon={<Icon />} title={menu.name}>
            {menu.children.map(secMenu => {
              if (secMenu.hidden) return
              // console.log(secMenu)
              return (
                <Menu.Item key={secMenu.path}>
                  <Link to={menu.path + secMenu.path}>{secMenu.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        // console.log(menu)
        return (
          <Menu.Item key={menu.path} icon={<Icon />}>
            {menu.path === '/' ? <Link to='/'>{menu.name}</Link> : menu.name}
          </Menu.Item>
        )
      }
    })
  }

  render() {
    // console.log(this.props)
    const path = this.props.location.pathname

    const reg = /[/][/a-z]*/
    const res = path.match(reg)[0]

    return (
      <>
        <Menu
          theme='dark'
          defaultSelectedKeys={[path]}
          mode='inline'
          defaultOpenKeys={[res]}
        >
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
          {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
            后台管理系统
          </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FileOutlined />} /> */}
        </Menu>
      </>
    )
  }
}

export default SiderMenu
