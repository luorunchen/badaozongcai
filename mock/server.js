//利用node的express,搭建一个服务器

//1-->引入express
const express = require('express')

// 进入mock
const Mock = require('mockjs')

// 从mock身上拿到random
const Random = Mock.Random

//返回中文标题
Random.ctitle()

//2-->调用express 得到一个app对象

const app = express()


//解决跨域问题 use是中间件
app.use((req, res, next) => {
  //设置响应头
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  //调用下一个中间件
  next()
})

app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  //req请求对象

  // 获取浏览器上面的路由参数
  let { page, limit } = req.params


  // 定义data数据
  //利用mock模拟数据
  const data = Mock.mock({
    total: Random.integer(+limit + 1, limit * 2),
    [`items|${limit}`]: [{
      '_id|+1': 1,
      title: '@ctitle(2,5)',
      parentId: 0
    }]
  })


  // res响应对象
  // 后台返回的数据是jsonp格式的字符串
  // 把对象转成json格式的字符串,返回給浏览器
  res.json({
    code: 20000,
    success: true,
    data,
    message: ''
  })






})

// 开启服务器
app.listen(8888, (err) => {
  if (err) {
    return console.log('服务启动失败')
  }

  console.log('服务启动成功 ')
})