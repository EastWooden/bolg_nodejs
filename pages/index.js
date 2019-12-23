import React, { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'


export default class Index extends Component {
  static async getInitialProps({req}) {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return {
      userAgent, stars: json.stargazers_count
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>EastM 个人博客</title>
          <meta name="viewport" content="initial-scale=1.0,width=device-width" key="viewport"/>
          <meta name="description" content="Eastm的个人博客" key="decription"/>
        </Head>
        <p>Hello world {this.props.userAgent}</p>
        <p>Next start: {this.props.stars}</p>
        <Link href="/about/">
          <a>here</a>
        </Link>
      </div>
    )
  }
}