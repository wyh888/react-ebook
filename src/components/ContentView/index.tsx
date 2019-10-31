import React, { Component } from 'react'
import './index.scss'
import { CSSTransition } from 'react-transition-group'
import { IContentViewProps } from '../../interfaces/ContentView'

export default class ContentView extends Component<IContentViewProps> {
  render() {
    let content
    if (this.props.bookAvailable) {
      content = (
        <div className='content-wrapper'>
          {this.props.navigation.toc.map((item: any, index: number) => {
            return (
              <div
                className='content-item'
                key={index}
                onClick={() => this.props.jumpTo(item.href)}
              >
                <span className='text'>{item.label}</span>
              </div>
            )
          })}
        </div>
      )
    } else {
      content = <div className='empty'>加载中...</div>
    }
    return (
      <CSSTransition
        in={this.props.ifShowContent}
        timeout={300}
        classNames='slide-right'
      >
        <div className={`content ${this.props.ifShowContent ? '' : 'hide'}`}>
          {content}
        </div>
      </CSSTransition>
    )
  }
}
