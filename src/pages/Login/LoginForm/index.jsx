import React, { Component, useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { reqGetverifyCode } from '@api/acl/acouth'
import { login, mobileLogin } from '@redux/actions/login'

import './index.less'

const { TabPane } = Tabs

// @withRouter
// @connect(null, {
//   login
// })
function LoginForm(props) {
  const [form] = Form.useForm()

  //验证码按钮状态
  const [isShowDownCount, setIsShowDownCount] = useState(false)
  //倒计时状态
  let [downCount, setDownCount] = useState(5)
  //登录按钮状态
  const [activeKey, setActiveKey] = useState('user')

  //登录按钮事件处理函数
  const onFinish = () => {
    //判断activeKey的值
    if (activeKey === 'user') {
      //校验账户和密码
      form.validateFields(['username', 'password']).then(res => {
        let { username, password } = res
        props.login(username, password).then(token => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    } else {
      //校验手机登录
      form.validateFields(['phone', 'verify']).then(res => {
        let { phone, verify } = res
        // console.log(res)
        props.mobileLogin(phone, verify).then(token => {
          // 登录成功
          // console.log('登陆成功~')
          // 持久存储token
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    }

    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  }
  // tab切换触发的事件处理函数
  const handleTabChange = activeKey => {
    console.log(activeKey)
    setActiveKey(activeKey)
  }

  // 验证
  const validatord = (rules, value) => {
    return new Promise((res, rej) => {
      if (!value) {
        return rej('请添加密码')
      }

      if (value.length < 4) {
        return rej('密码不能小于4位')
      }
      if (value.length > 16) {
        return rej('密码不能大于16位')
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return rej('禁止使用特殊符号')
      }

      return res
    })
  }

  const getYanZhengMa = async () => {
    // console.log('获取验证码')
    // 手动触发表单的校验,通过校验 才执行后续代码
    const res = await form.validateFields(['phone'])
    //给开发者服务器发送请求
    await reqGetverifyCode(res.phone)
    // 验证成功后給按钮修改状态
    setIsShowDownCount(true)

    //定时器修改按钮倒计时
    let time = setInterval(() => {
      downCount--
      setDownCount(downCount)
      //判断当倒计时数字=0时,清除定时器
      if (downCount < 0) {
        // 清除定时器
        clearInterval(time)
        //更改回按钮状态
        setIsShowDownCount(false)
        //修改回倒计时时间
        setDownCount(5)
      }
    }, 1000)
  }

  //第三方登陆跳转
  const goToGit = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=abd9d5ee3cb2eb586111`
  }

  return (
    <>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={props.onFinish}
        form={form}
      >
        <Tabs
          defaultActiveKey='user'
          tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
          onChange={handleTabChange}
        >
          <TabPane tab='账户密码登陆' key='user'>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: '必须输入用户名'
                },
                {
                  min: 4,
                  message: '不能小于4位'
                },
                {
                  max: 16,
                  message: '不能超过16位'
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '禁止使用特别符号'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className='form-icon' />}
                placeholder='用户名: admin'
              />
            </Form.Item>
            <Form.Item name='password' rules={[{ validatord }]}>
              <Input
                prefix={<LockOutlined className='form-icon' />}
                type='password'
                placeholder='密码: 111111'
              />
            </Form.Item>
          </TabPane>
          <TabPane tab='手机号登陆' key='phone'>
            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: '请输入正确的手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className='form-icon' />}
                placeholder='手机号'
              />
            </Form.Item>

            <Row justify='space-between'>
              <Col span={16}>
                <Form.Item name='verify'>
                  <Input
                    prefix={<MailOutlined className='form-icon' />}
                    placeholder='验证码'
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button
                  className='verify-btn'
                  onClick={getYanZhengMa}
                  disabled={isShowDownCount}
                >
                  {isShowDownCount ? `${downCount}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify='space-between'>
          <Col span={7}>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type='link'>忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type='primary'
            // htmlType='submit'
            onClick={onFinish}
            className='login-form-button'
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item>
          <Row justify='space-between'>
            <Col span={16}>
              <span>
                其他登陆方式
                <GithubOutlined className='login-icon' onClick={goToGit} />
                <WechatOutlined className='login-icon' />
                <QqOutlined className='login-icon' />
              </span>
            </Col>
            <Col span={3}>
              <Button type='link'>注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default withRouter(connect(null, { login, mobileLogin })(LoginForm))
