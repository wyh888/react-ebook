interface IBody {
  color: string
  background: string
}

interface IStyle {
  body: IBody
}

export interface IFontSizeItem {
  fontSize: number
}

export interface IThemeItem {
  name: string
  style: IStyle
}
