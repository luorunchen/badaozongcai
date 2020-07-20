import React, { Component } from 'react'

import { AreaChart, ColumnChart } from 'bizcharts'

//导入antd
import { Row, Col, Statistic, Progress, Skeleton } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
// 导入自己封装的Card
import Card from '@comps/Card'

// antd-->响应是栅格
const firstRowCol = {
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

// 数据源
const data = [
  { year: '1991', value: 6 },
  { year: '1992', value: 7 },
  { year: '1993', value: 5 },
  { year: '1994', value: 9 },
  { year: '1995', value: 4 }
]

const data2 = [
  {
    type: '家具家电',
    sales: 38
  },
  {
    type: '粮油副食',
    sales: 52
  },
  {
    type: '生鲜水果',
    sales: 61
  },
  {
    type: '美容洗护',
    sales: 145
  },
  {
    type: '母婴用品',
    sales: 48
  },
  {
    type: '进口食品',
    sales: 38
  },
  {
    type: '食品饮料',
    sales: 38
  },
  {
    type: '家庭清洁',
    sales: 38
  }
]

export default class index extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true
    })

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000)
  }

  render() {
    return (
      <div>
        <Row gutter={24}>
          {/* 第一张卡片 */}
          <Col {...firstRowCol}>
            <Skeleton
              loading={this.state.loading}
              active
              title={{ width: '100%' }}
              paragraph={{ rows: 4, width: '100%' }}
            >
              <Card
                title={<Statistic title='总销售额' perfix='¥' value={123456} />}
                footer={<span>日销售额 ¥ 12,345</span>}
              >
                <span>
                  周同比 12% <CaretUpOutlined style={{ color: '#cf1322' }} />
                </span>
                <span style={{ marginLeft: 15 }}>
                  日同比 10% <CaretDownOutlined style={{ color: '#3f8600' }} />
                </span>
              </Card>
            </Skeleton>
          </Col>

          {/* 第二张卡片 */}
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='访问量' value={123456} />}
              footer={<span>日销售额 ¥ 12,345</span>}
            >
              <AreaChart
                data={data}
                title={{
                  visible: true
                }}
                xAxis={{
                  // 表示水平方向坐标是否展示
                  visible: false
                }}
                yAxis={{
                  // 表示垂直方向坐标是否展示
                  visible: false
                }}
                // line={{
                //   visible: false
                // }}
                smooth={true}
                yField='value'
                xField='year'
                padding='0'
                color='pink'
              />
            </Card>
          </Col>

          {/* 第三张卡片 */}
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='支付笔数' value={333333} />}
              footer={<span>转化率60%</span>}
            >
              <ColumnChart
                data={data2}
                title={{
                  visible: true
                }}
                xAxis={{
                  // 表示水平方向坐标是否展示
                  visible: false
                }}
                yAxis={{
                  // 表示垂直方向坐标是否展示
                  visible: false
                }}
                forceFit
                padding='0'
                xField='type'
                yField='sales'
                meta={{
                  type: {
                    alias: '类别'
                  },
                  sales: {
                    alias: '销售额(万)'
                  }
                }}
              />
            </Card>
          </Col>
          {/* 第四张卡片 */}
          <Col {...firstRowCol}>
            <Card
              title={<Statistic title='运营结果' value={333333} />}
              footer={
                <span>
                  周同比 12% <CaretUpOutlined style={{ color: '#cf1322' }} />
                  <span style={{ marginLeft: 15 }}>
                    日同比 10%{' '}
                    <CaretDownOutlined style={{ color: '#3f8600' }} />
                  </span>
                </span>
              }
            >
              <Progress
                percent={80}
                status='active'
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068'
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
