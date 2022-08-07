export interface WebsiteMetaData {
  title?: string
  description?: string
  favicon?: string
  favicons: {
    rel?: string
    type?: string
    sizes?: string
    href?: string
  }[]
  metaTags: {
    name?: string
    property?: string
    content?: string
  }[]
}
