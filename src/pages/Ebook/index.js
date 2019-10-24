import React, { Component } from 'react'
import './index.scss'
import Epub from 'epubjs'

const DOWNLOAD_URL = '/ebook/2018_Book_AgileProcessesInSoftwareEngine.epub'

export default class Ebook extends Component {
  render () {
    return (
      <div className="ebook">
        <div className="read-wrapper">
          <div id="read"></div>
          <div className="mask">
            <div className="left" onClick={this.prevPage.bind(this)}></div>
            <div className="center"></div>
            <div className="right" onClick={this.nextPage.bind(this)}></div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.showEpub()
  }

  prevPage () {
    if (this.rendition) {
      this.rendition.prev()
    }
  }

  nextPage () {
    if (this.rendition) {
      this.rendition.next()
    }
  }

  showEpub () {
    this.book = new Epub(DOWNLOAD_URL)
    this.rendition = this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
      // 兼容iOS
      method: 'default'
    })
    this.rendition.display()
  }
}
