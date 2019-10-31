import React, { Component } from 'react'
import './index.scss'
import Epub from 'epubjs'
import TitleBar from '../../components/TitleBar'
import MenuBar from '../../components/MenuBar'
import { IEbookState } from '../../interfaces/Ebook'

const DOWNLOAD_URL = '/ebook/book.epub'

export default class Ebook extends Component<{}, IEbookState> {
  private book: any
  private rendition: any
  private themes: any
  private locations: any
  private menuBar: any

  
  constructor(props: object) {
    super(props)

    this.state = {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000',
              background: '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff',
              background: '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000',
              background: 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {}
    }
    this.onRef = this.onRef.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.toggleTitleAndMenu = this.toggleTitleAndMenu.bind(this)
    this.setFontSize = this.setFontSize.bind(this)
    this.setTheme = this.setTheme.bind(this)
    this.onProgressChange = this.onProgressChange.bind(this)
    this.jumpTo = this.jumpTo.bind(this)
    this.hideTitleAndMenu = this.hideTitleAndMenu.bind(this)
  }

  render() {
    return (
      <div className='ebook'>
        <TitleBar ifTitleAndMenuShow={this.state.ifTitleAndMenuShow} />

        <MenuBar
          ifTitleAndMenuShow={this.state.ifTitleAndMenuShow}
          fontSizeList={this.state.fontSizeList}
          defaultFontSize={this.state.defaultFontSize}
          themeList={this.state.themeList}
          defaultTheme={this.state.defaultTheme}
          bookAvailable={this.state.bookAvailable}
          navigation={this.state.navigation}
          onProgressChange={this.onProgressChange}
          setFontSize={this.setFontSize}
          setTheme={this.setTheme}
          jumpTo={this.jumpTo}
          onRef={this.onRef}
        />

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

  // 获取子组件
  onRef(name: string, ref: any) {
    switch (name) {
      case 'menuBar':
        this.menuBar = ref
        break
      default:
        break
    }
  }

  componentDidMount() {
    this.showEpub()
  }

  toggleTitleAndMenu() {
    this.setState({
      ifTitleAndMenuShow: !this.state.ifTitleAndMenuShow
    })
    this.state.ifTitleAndMenuShow && this.menuBar.hideSetting()
  }

  prevPage() {
    this.rendition && this.rendition.prev()
  }

  nextPage() {
    this.rendition && this.rendition.next()
  }

  jumpTo(href: string) {
    this.rendition.display(href)
    this.hideTitleAndMenu()
  }

  hideTitleAndMenu() {
    this.setState({
      ifTitleAndMenuShow: false
    })
    this.menuBar.hideSetting()
    this.menuBar.hideContent()
  }

  setTheme(index: number) {
    this.themes.select(this.state.themeList[index].name)
    this.setState({
      defaultTheme: index
    })
  }

  registerTheme() {
    this.state.themeList.forEach(theme => {
      this.themes.register(theme.name, theme.style)
    })
  }

  setFontSize(fontSize: number) {
    this.themes && this.themes.fontSize(fontSize)
    this.setState({
      defaultFontSize: fontSize
    })
  }

  onProgressChange(progress: string) {
    const percentage = Number(progress) / 100
    const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
    this.rendition.display(location)
  }

  showEpub() {
    this.book = new Epub(DOWNLOAD_URL)
    this.rendition = this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight,
      // 兼容iOS
      method: 'default'
    })
    this.rendition.display()
    // 获取 theme 对象
    this.themes = this.rendition.themes
    // 设置默认字体
    this.setFontSize(this.state.defaultFontSize)
    // 注册主题
    this.registerTheme()
    // 设置默认主题
    this.setTheme(this.state.defaultTheme)
    // Book对象的钩子函数ready
    this.book.ready.then(() => {
      this.setState({
        navigation: this.book.navigation
      })
      // 生成Locations对象
      return this.book.locations.generate()
    }).then((result: any) => {
      // 保存locations对象
      this.locations = this.book.locations
      // 标记电子书为解析完毕状态
      this.setState({
        bookAvailable: true
      })
    })
  }
}
