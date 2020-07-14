import React, { Component } from "react";
import { Button, Table } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.css'
//导入mock定义的发送请求方法
import { reqGetSubjectList } from '@api/edu/subject'

const columns = [
  { title: '学科', dataIndex: 'title', key: 'title' },

  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    width: 200,
    render: () => <>

      <Button type="primary" className='btn1'>
        <FormOutlined />
      </Button>
      <Button type='danger' >
        <DeleteOutlined />
      </Button>
    </>
  },
]

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  }
]

export default class Subject extends Component {
  //直接给组件
  currentPage = 1

  state = {
    subject: {}
  }
  //一打开页面就发送请求
  componentDidMount () {
    this.GetSubjectList(1, 10)
  }


  //获取subject数据的方法
  GetSubjectList = async (page, limit) => {
    const res = await reqGetSubjectList(page, limit)
    // console.log(res); 

    this.setState({
      subject: res
    })


  }
  handlepageChange = (page, pageSize) => {
    //发送请求
    this.GetSubjectList(page, pageSize)
    this.currentPage = page
  }

  render () {


    return <div className='btn'>

      <Button type='primary' className="subject-btn-add" ><PlusOutlined />新建</Button>


      {/* 表格数据 */}

      <Table rowKey="_id"
        pagination={{
          total: this.state.subject.total, //total表示数据总数
          showQuickJumper: true, //是否显示快速跳转
          showSizeChanger: true, // 是否显示修改每页显示数据数量
          pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
          defaultPageSize: 5, //每页默认显示数据条数 默认是10,
          onChange: this.handlepageChange,//页码改变的时候触发,
          onShowSizeChange: (current, size) => { this.GetSubjectList(current, size) }, //一页展示几条数据变化时触发 current 当前页码, size 一页几条
          current: this.currentPage
        }}
        // 控制列
        columns={columns}
        //控制可展开项
        expandable={{
          //控制展开项的内容
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable'
        }}
        //展示里面的数据
        dataSource={this.state.subject.items}
      />




    </div>;
  }
}
