import React, { Component } from 'react'
import { Button, Table, Tooltip, Input, message, Modal } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.css'
//导入mock定义的发送请求方法
// import { reqGetSubjectList } from '@api/edu/Subject'

//导入connect
import { connect } from 'react-redux'

//导入异步actions
import {
  GetSubjectList,
  GetSecSubjectList,
  UpdateSubjectList
} from './redux/index'

// const data = [
//   {
//     key: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description:
//       'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     description:
//       'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: 'Not Expandable',
//     age: 29,
//     address: 'Jiangsu No. 1 Lake Park',
//     description: 'This not expandable',
//   },
//   {
//     key: 4,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     description:
//       'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
//   },
// ]

//通过pormise可以获取subjecetList属性
// { GetSubjectList }是connect重新封装的函数
@connect(state => ({ subjecrList: state.subjectList }), {
  GetSubjectList,
  GetSecSubjectList,
  UpdateSubjectList
})
class Subject extends Component {
  //直接给组件
  currentPage = 1

  state = {
    subjectId: '',
    subjectTitle: ''
  }

  //一打开页面就发送请求
  componentDidMount() {
    // this.GetSubjectList(1, 10)

    this.props.GetSubjectList(1, 10)
  }

  //获取subject数据的方法
  // GetSubjectList = async (page, limit) => {
  //   const res = await reqGetSubjectList(page, limit)
  //   // console.log(res);

  //   this.setState({
  //     subject: res,
  //   })
  // }

  //点击页码获得相应数据
  handlepageChange = (page, pageSize) => {
    //发送请求
    // this.GetSubjectList(page, pageSize)
    this.currentPage = page
    this.props.GetSubjectList(page, pageSize)
  }

  // 点击新增跳转到课程分类
  handleGoToAddSubject = () => {
    // console.log(this.props)
    // 新增是在教学模块下,需要在路径中加edu
    this.props.history.push('/edu/subject/add')
  }

  // 点击可展开按钮
  // expand-->表示是否展开
  // record-->表示相应行的数据
  handleclickExpand = (expand, record) => {
    //判断如果是展开就请求二级菜单数据
    console.log(expand, record)
    if (expand) {
      //请求二级菜单数据
      console.log('123', record._id)
      this.props.GetSecSubjectList(record._id)
    }
  }

  //点击更新按钮事件函数
  handleUpdateClick = value => {
    //修改subjectId
    return () => {
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title
      })

      // 点击存储subjectTitle数据
      this.oldsubjecttitle = value.title
    }
  }

  //修改数据时受控组件input回调函数
  handleChange = e => {
    this.setState({
      subjectTitle: e.target.value.trim()
    })
  }

  //取消按钮的事件处理函数
  handleCanle = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''
    })
  }
  //确认按钮的事件处理函数
  handleUpdate = () => {
    let { subjectTitle, subjectId } = this.state

    //判断输入的数据是否为空
    if (subjectTitle.length === 0) {
      message.error('课程分类名称不能为空')
      return
    }
    //点击更新按钮的时候保存subjectTitle数据
    if (subjectTitle === this.oldsubjecttitle) {
      message.error('课程名称未修改')
      return
    }

    this.props.UpdateSubjectList(subjectId, subjectTitle)

    message.success('更改成功')

    // this.setState({
    //   subjectId: '',
    //   subjectTitle: ''
    // })
    this.handleCanle()
  }

  //删除按钮
  handleDeleClick = value => {
    Modal.confirm({
      title: '确定要删除嘛?',
      // icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确定',
      onOk() {
        console.log('OK')
      }
    })
  }

  render() {
    //这个columns必须写到render中,因为state变化,render会调用,这个函数才会重新执行
    const columns = [
      {
        title: '学科',
        // dataIndex: 'title',
        key: 'title',
        render: value => {
          //条件渲染
          //判断state里面存储的id与value数据里的ID相同,就展示input框
          if (this.state.subjectId === value._id) {
            return (
              <Input
                value={this.state.subjectTitle}
                onChange={this.handleChange}
              />
            )
          }

          return <span>{value.title}</span>
        }
      },

      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        width: 200,
        render: value => {
          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button type='primary' onClick={this.handleUpdate}>
                  确认
                </Button>
                <Button type='primary' onClick={this.handleCanle}>
                  取消
                </Button>
              </>
            )
          }

          return (
            <>
              <Tooltip title='更新章节'>
                <Button
                  type='primary'
                  className='btn1'
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除章节'>
                <Button type='danger' onClick={this.handleDeleClick}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        }
      }
    ]
    return (
      <div className='btn'>
        <Button
          type='primary'
          className='subject-btn-add'
          onClick={this.handleGoToAddSubject}
        >
          <PlusOutlined />
          新建
        </Button>

        {/* 表格数据 */}

        <Table
          rowKey='_id'
          pagination={{
            total: this.props.subjecrList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
            defaultPageSize: 5, //每页默认显示数据条数 默认是10,
            onChange: this.handlepageChange, //页码改变的时候触发,
            onShowSizeChange: (current, size) => {
              this.props.GetSubjectList(current, size)
            }, //一页展示几条数据变化时触发 current 当前页码, size 一页几条
            current: this.currentPage
          }}
          // 控制列
          columns={columns}
          //控制可展开项
          expandable={{
            //控制展开项的内容
            // expandedRowRender: (record) => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // rowExpandable: (record) => record.name !== 'Not Expandable',

            //点击可展开按钮
            onExpand: this.handleclickExpand
          }}
          //展示里面的数据
          dataSource={this.props.subjecrList.items}
        />
      </div>
    )
  }
}

export default Subject
