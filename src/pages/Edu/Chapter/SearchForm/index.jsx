import React, { useEffect, useState } from 'react'
import { Form, Select, Button, message } from 'antd'
import { connect } from 'react-redux'

//导入请求函数
import { reqGetCourseList } from '@api/edu/course'
import { getChapterList } from '../redux'
import './index.less'

const { Option } = Select

function SearchForm(props) {
  //定义课程列表状态
  const [courseList, setCourseList] = useState([])
  // console.log(courseList)
  const [form] = Form.useForm()

  const resetForm = () => {
    form.resetFields(['teacherId'])
  }

  //获取课程列表数据/组件挂载成功获取数据
  //useEffect-->模拟类组件的conponentDidMount钩子函数
  useEffect(() => {
    async function fetchData() {
      const res = await reqGetCourseList()
      // console.log(res)
      //給课程列表赋值
      setCourseList(res)
      // console.log(setCourseList)
    }
    fetchData()
  }, [])

  //获取章节列表数据的方法
  const handleFinish = async value => {
    // console.log(value)
    const data = {
      page: 1,
      limit: 10,
      courseId: value.chapterId
    }
    await props.getChapterList(data)
    console.log(props)
    console.log(data)
    message.success('章节列表已更新')
  }
  return (
    <Form layout='inline' form={form} onFinish={handleFinish}>
      <Form.Item name='chapterId' label='课程'>
        <Select
          allowClear
          placeholder='课程'
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map(course => {
            // console.log(course._id)
            return (
              <Option key={course._id} value={course._id}>
                {course.title}
              </Option>
            )
          })}
          {/* <Option value='1'>1</Option>
          <Option value='2'>2</Option>
          <Option value='3'>3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

connect(null, { getChapterList })(SearchForm)

export default connect(null, { getChapterList })(SearchForm)
