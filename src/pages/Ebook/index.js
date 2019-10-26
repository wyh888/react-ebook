import React, { Component } from 'react'
import './index.scss'
import Epub from 'epubjs'
import { CSSTransition } from 'react-transition-group'

const DOWNLOAD_URL = '/ebook/2018_Book_AgileProcessesInSoftwareEngine.epub'

export default class Ebook extends Component {
  constructor () {
    super()

    this.state = {
      ifTitleAndMenuShow: false
    }
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.toggleTitleAndMenu = this.toggleTitleAndMenu.bind(this)
  }

  render () {
    return (
      <div className='ebook'>
        <CSSTransition
          in={this.state.ifTitleAndMenuShow}
          timeout={300}
          classNames='slide-down'
          unmountOnExit
        >
          <div className='title-wrapper'>
            <div className='left'>
              <span className='icon icon-back'></span>
            </div>
            <div className='right'>
              <div className='icon-wrapper'>
                <span className='icon icon-cart'></span>
              </div>
              <div className='icon-wrapper'>
                <span className='icon icon-person'></span>
              </div>
              <div className='icon-wrapper'>
                <span className='icon icon-more'></span>
              </div>
            </div>
          </div>
        </CSSTransition>

        <CSSTransition
          in={this.state.ifTitleAndMenuShow}
          timeout={300}
          classNames="slide-up"
          unmountOnExit
        >
          <div className='menu-wrapper'>
            <div className='icon-wrapper'>
              <span className='icon icon-menu'></span>
            </div>
            <div className='icon-wrapper'>
              <span className='icon icon-progress'></span>
            </div>
            <div className='icon-wrapper'>
              <span className='icon icon-bright'></span>
            </div>
            <div className='icon-wrapper'>
              <span className='icon icon-a'>A</span>
            </div>
          </div>
        </CSSTransition>

        <div className='read-wrapper'>
          <div id='read'></div>
          <div className='mask'>
            <div className='left' onClick={this.prevPage}></div>
            <div className='center' onClick={this.toggleTitleAndMenu}></div>
            <div className='right' onClick={this.nextPage}></div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.showEpub()
  }

  toggleTitleAndMenu () {
    this.setState({
      ifTitleAndMenuShow: !this.state.ifTitleAndMenuShow
    })
  }

  prevPage () {
    this.rendition && this.rendition.prev()
    this.state.ifTitleAndMenuShow && this.setState({
      ifTitleAndMenuShow: false
    })
  }

  nextPage () {
    this.rendition && this.rendition.next()
    this.state.ifTitleAndMenuShow && this.setState({
      ifTitleAndMenuShow: false
    })
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
