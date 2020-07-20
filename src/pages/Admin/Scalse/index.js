import React, { Component } from 'react'
import moment from 'moment'
import { Card, Tabs, Button, DatePicker, Skeleton } from 'antd'
import { ColumnChart } from 'bizcharts'
import './index.css'

const { RangePicker } = DatePicker

const tabListNoTitle = [
  {
    key: '销售量',
    tab: '销售量'
  },
  {
    key: '访问量',
    tab: '访问量'
  }
]

const contentListNoTitle = {
  销售量: <p>销售量</p>,
  访问量: <p>访问量</p>
}

const data = [
  {
    type: '1月',
    sales: 150
  },
  {
    type: '2月',
    sales: 58
  },
  {
    type: '3月',
    sales: 58
  },
  {
    type: '4月',
    sales: 60
  },
  {
    type: '5月',
    sales: 32
  },
  {
    type: '6月',
    sales: 41
  },
  {
    type: '7月',
    sales: 28
  },
  {
    type: '8月',
    sales: 31
  },
  {
    type: '9月',
    sales: 52
  },
  {
    type: '10月',
    sales: 11
  },
  {
    type: '11月',
    sales: 23
  },
  {
    type: '12月',
    sales: 55
  }
]

export default class index extends Component {
  state = {
    key: 'tab',
    dateFlag: 'day',
    rangTime: [moment(), moment()],
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

  onTabChange = key => {
    console.log(key)
    this.setState({ key })
  }
  handleClick = dateFlag => () => {
    let rangTime = null
    switch (dateFlag) {
      case 'day':
        rangTime = [moment(), moment()]
        break
      case 'week':
        rangTime = [moment(), moment().add(7, 'd')]
        break
      case 'month':
        rangTime = [moment(), moment().add(1, 'M')]
        break
      case 'year':
        rangTime = [moment(), moment().add(1, 'y')]
        break
    }
    this.setState({
      dateFlag,
      rangTime
    })
  }

  render() {
    const { dateFlag } = this.state
    const extra = (
      <>
        <Button
          style={{ border: 'none' }}
          type={dateFlag === 'week' ? 'link' : 'text'}
          onClick={this.handleClick('week')}
        >
          本周
        </Button>
        <Button
          style={{ border: 'none' }}
          type={dateFlag === 'month' ? 'link' : 'text'}
          onClick={this.handleClick('month')}
        >
          本月
        </Button>
        <Button
          style={{ border: 'none' }}
          type={dateFlag === 'year' ? 'link' : 'text'}
          onClick={this.handleClick('year')}
        >
          本年
        </Button>
        <Button
          style={{ border: 'none' }}
          type={dateFlag === 'day' ? 'link' : 'text'}
          onClick={this.handleClick('day')}
        >
          今日
        </Button>

        <RangePicker value={this.state.rangTime} />
      </>
    )

    return (
      <div className='tab'>
        <Card
          style={{ width: '100%' }}
          // 页签标题列表
          tabList={tabListNoTitle}
          // 当前激活页签的 key
          activeTabKey={this.state.noTitleKey}
          // tab bar 上额外的元素
          tabBarExtraContent={extra}
          // 页签切换的回调
          onTabChange={key => {
            this.onTabChange(key)
          }}
        >
          <Skeleton
            loading={this.state.loading}
            active
            title={{ width: '100%' }}
            paragraph={{ rows: 4, width: '100%' }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
            <ColumnChart
              data={data}
              title={{
                visible: true,
                text: '销售量'
              }}
              forceFit
              padding='0'
              xField='type'
              yField='sales'
              meta={{
                type: {
                  alias: '月份'
                }
              }}
            />
          </Skeleton>
        </Card>
      </div>
    )
  }
}
