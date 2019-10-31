import { IFontSizeItem, IThemeItem } from './DefaultTypes'

export interface IEbookState {
  ifTitleAndMenuShow: boolean
  fontSizeList: Array<IFontSizeItem>
  defaultFontSize: number
  themeList: Array<IThemeItem>
  defaultTheme: number
  bookAvailable: boolean
  navigation: any
}
