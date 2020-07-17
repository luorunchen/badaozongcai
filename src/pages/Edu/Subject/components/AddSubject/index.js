import React, { Component } from 'react'
import { connect } from 'react-redux'
// 导入antd组件
import { Card, Button, Form, Input, Select, message, Tooltip } from 'antd'
//导入ArrowLeftOutlined
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

// 导入异步action
// import { GetSubjectList } from '../../redux'

import { reqGetSubjectList, reqAddSecSubjectList } from '@api/edu/Subject'

import './index.css'

// 获取Option组件
const Option = Select.Option

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分

  labelCol: {
    span: 3,
  },
  // 表单项部分
  wrapperCol: {
    span: 6,
  },
}

// @connect((state) => ({ subjectList: state.subjectList }), { GetSubjectList })
class AddSubject extends Component {
  state = {
    subjectList: {
      total: 0,
      items: [],
    },
  }

  // 用来存储请求一级课程分类数据
  page = 1
  async componentDidMount() {
    //组件挂载成功,立即发送请求获取一级分类课程数据
    // this.props.GetSubjectList(this.page++, 10)

    // 直接请求数据
    const res = await reqGetSubjectList(this.page++, 10)
    this.setState({
      subjectList: res,
    })
  }

  // 加载更多数据
  handleMore = async () => {
    // this.props.GetSubjectList(this.page++, 10)
    const res = await reqGetSubjectList(this.page++, 10)

    // 新数据和老数据拼接
    const newItems = [...this.state.subjectList.items, ...res.items]

    this.setState({
      subjectList: {
        total: res.total,
        items: newItems,
      },
    })
  }

  // 点击添加按钮,表单校验成功之后的回调函数
  onFinish = async (values) => {
    try {
      await reqAddSecSubjectList(values.subjectname, values.parentid)
      message.success('课程分类添加成功')
      //添加成功跳回subjectlist页面
      this.props.history.push('/edu/subject/list')
    } catch {
      message.error('课程分类添加失败')
    }
  }

  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined />
            </Link>
            <span className='title'>新增课程</span>
          </>
        }
      >
        <Form
          //給表单中的表单项布局
          {...layout}
          name='subject'
          //当点击表单内的提交按钮,onfinish会触发
          onFinish={this.onFinish}
          //提交失败的时候会触发
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='课程分类名称'
            //表单提交时的属性
            name='subjectname'
            //校验规则
            rules={[
              {
                //必填项
                required: true,
                message: '请输入课程分类!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id',
              },
            ]}
          >
            <Select
              dropdownRender={(menu) => {
                return (
                  <>
                    {menu}
                    {/* 如果total的值比items的值大,说明还有值 */}
                    {this.state.subjectList.total >
                      this.state.subjectList.items.length && (
                      <Button type='link' onClick={this.handleMore}>
                        加载更多数据
                      </Button>
                    )}
                  </>
                )
              }}
            >
              <Option value={0} key={0}>
                {'一级课程分类'}
              </Option>
              {/* 根据拿到的一个分类,动态渲染 */}
              {this.state.subjectList.items.map((subject) => {
                return (
                  <Option value={subject._id} key={subject._id}>
                    {subject.title}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default AddSubject
