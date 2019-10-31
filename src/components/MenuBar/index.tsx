import React, { Component, ChangeEvent } from 'react'
import './index.scss'
import ContentView from '../ContentView'
import { CSSTransition } from 'react-transition-group'
import { IMenuBarProps, IMenuBarState } from 'interfaces/MenuBar'

export default class MenuBar extends Component<IMenuBarProps, IMenuBarState> {
  constructor(props: IMenuBarProps) {
    super(props)

    this.state = {
      ifSettingShow: false,
      ifShowContent: false,
      showTag: 0,
      progress: '0'
    }

    this.showSetting = this.showSetting.bind(this)
    this.hideContent = this.hideContent.bind(this)
    this.onProgressChange = this.onProgressChange.bind(this)
    this.onProgressInput = this.onProgressInput.bind(this)
  }

  private input: any

  render() {
    const fontSizeListLength = this.props.fontSizeList.length
    const showTag = this.state.showTag
    let settingItem

    if (showTag === 0) {
      settingItem = (
        <div className='setting-font-size'>
          <div
            className='preview'
            style={{ fontSize: this.props.fontSizeList[0].fontSize + 'px' }}
          >
            A
          </div>
          <div className='select'>
            {this.props.fontSizeList.map((item, index) => {
              return (
                <div className='select-wrapper' key={index}>
                  <div className='line'></div>
                  <div
                    className='point-wrapper'
                    onClick={() => this.props.setFontSize(item.fontSize)}
                  >
                    <div
                      className='point'
                      style={{
                        opacity:
                          item.fontSize === this.props.defaultFontSize ? 1 : 0
                      }}
                    >
                      <div className='small-point'></div>
                    </div>
                  </div>
                  <div className='line'></div>
                </div>
              )
            })}
          </div>
          <div
            className='preview'
            style={{
              fontSize:
                this.props.fontSizeList[fontSizeListLength - 1].fontSize + 'px'
            }}
          >
            A
          </div>
        </div>
      )
    } else if (showTag === 1) {
      settingItem = (
        <div className='setting-theme'>
          {this.props.themeList.map((item, index) => {
            return (
              <div
                className='setting-theme-item'
                key={index}
                onClick={() => this.props.setTheme(index)}
              >
                <div
                  className={`preview ${
                    item.style.body.background === '#fff' ? '' : 'no-border'
                  }`}
                  style={{ background: item.style.body.background }}
                ></div>
                <div
                  className={`text ${
                    index === this.props.defaultTheme ? 'selected' : ''
                  }`}
                >
                  {item.name}
                </div>
              </div>
            )
          })}
        </div>
      )
    } else if (showTag === 2) {
      settingItem = (
        <div className='setting-progress'>
          <div className='progress-wrapper'>
            <input
              className='progress'
              type='range'
              max='100'
              min='0'
              step='1'
              value={this.state.progress}
              disabled={!this.props.bookAvailable}
              ref={input => (this.input = input)}
              onChange={this.onProgressChange}
              onInput={this.onProgressInput}
            />
          </div>

          <div className='text-wrapper'>
            <span>
              {this.props.bookAvailable
                ? this.state.progress + '%'
                : '加载中...'}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className='menu-bar'>
        <CSSTransition
          in={this.state.ifSettingShow}
          timeout={300}
          classNames='slide-up'
          unmountOnExit
        >
          <div className='setting-wrapper'>{settingItem}</div>
        </CSSTransition>

        <CSSTransition
          in={this.props.ifTitleAndMenuShow}
          timeout={300}
          classNames='slide-up'
          unmountOnExit
        >
          <div
            className={`menu-wrapper ${
              this.state.ifSettingShow || !this.props.ifTitleAndMenuShow
                ? 'hide-box-shadow'
                : ''
            }`}
          >
            <div className='icon-wrapper'>
              <span
                className='icon icon-menu'
                onClick={() => this.showSetting(3)}
              ></span>
            </div>
            <div className='icon-wrapper'>
              <span
                className='icon icon-progress'
                onClick={() => this.showSetting(2)}
              ></span>
            </div>
            <div className='icon-wrapper'>
              <span
                className='icon icon-bright'
                onClick={() => this.showSetting(1)}
              ></span>
            </div>
            <div className='icon-wrapper'>
              <span className='icon icon-a' onClick={() => this.showSetting(0)}>
                A
              </span>
            </div>
          </div>
        </CSSTransition>
        <ContentView
          navigation={this.props.navigation}
          bookAvailable={this.props.bookAvailable}
          ifShowContent={this.state.ifShowContent}
          jumpTo={this.props.jumpTo}
        />
        <CSSTransition
          in={this.state.ifShowContent}
          timeout={300}
          classNames='fade'
        >
          <div className={`content-mask ${this.state.ifShowContent ? '' : 'hide'}`} onClick={this.hideContent}></div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    this.props.onRef('menuBar', this)
  }

  onProgressChange(e: ChangeEvent<HTMLInputElement>) {
    this.props.onProgressChange(e.target.value)
  }

  onProgressInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      progress: e.target.value
    })
    this.input.style.backgroundSize = `${e.target.value}% 100%`
  }

  showSetting(tag: number): void {
    this.setState({
      showTag: tag
    })
    if (tag === 3) {
      this.setState({
        ifSettingShow: false,
        ifShowContent: true
      })
    } else {
      this.setState({
        ifSettingShow: true
      })
    }
  }

  hideContent() {
    this.setState({
      ifShowContent: false
    })
  }

  hideSetting() {
    this.setState({
      ifSettingShow: false
    })
  }
}
