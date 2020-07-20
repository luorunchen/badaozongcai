import React, { Component } from 'react'

import Analysis from './Analysis'
// import Monitor from "./Monitor";
// import Search from "./Search";
// import Statistics from "./Statistics";
import Scalse from './Scalse'
import Seacrh from './Search'
export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        <Scalse></Scalse>
        <Seacrh></Seacrh>
      </div>
    )
  }
}
