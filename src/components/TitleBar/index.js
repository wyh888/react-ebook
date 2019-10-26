import React, { Component } from 'react'
import './index.scss'
import { CSSTransition } from 'react-transition-group'

export default class TitleBar extends Component {
  render () {
    return (
      <CSSTransition
        in={this.props.ifTitleAndMenuShow}
        timeout={300}
        classNames='slide-down'
        appear={true}
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
    )
  }
}
