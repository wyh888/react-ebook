import { IFontSizeItem, IThemeItem } from './DefaultTypes'

export interface IMenuBarProps {
  ifTitleAndMenuShow: boolean
  fontSizeList: Array<IFontSizeItem>
  defaultFontSize: number
  themeList: Array<IThemeItem>
  defaultTheme: number
  bookAvailable: boolean
  navigation: any
  onProgressChange: (progress: string) => void
  setFontSize: (fontSize: number) => void
  setTheme: (index: number) => void
  jumpTo: (href: string) => void
  onRef: (name: string, ref: any) => void
}

export interface IMenuBarState {
  ifSettingShow: boolean
  ifShowContent: boolean
  showTag: number
  progress: string
}
