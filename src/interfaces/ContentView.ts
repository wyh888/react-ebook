export interface IContentViewProps {
  bookAvailable: boolean
  navigation: any
  ifShowContent: boolean
  jumpTo: (href: string) => void
}
