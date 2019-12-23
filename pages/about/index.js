import React,{ Component } from 'react'
import fetch from 'isomorphic-unfetch'

export default class About extends Component {
  static async getInitialProps () {
    let res = await fetch('http://127.0.0.1:8080/admin/getArticleList',{method:"post"});
    let resData = await res.json();
    const articleList = resData.entity.rows;
    return {
      articleList: articleList
    }
  }
  render() {
    const {
      articleList
    } = this.props;
    return (
    <div>
      welcome to abooutpage
      <img src = "/static/logo.png" alt="image" />
      {
        articleList.map((item,index)=> {
          return (
            <div key={index}>{item.articleName}</div>
          )
        })
      }
    </div>
    )
  }
}