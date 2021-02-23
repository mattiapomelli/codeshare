import { FunctionComponent } from 'react'
import NextHead from 'next/head'

const PageHead: FunctionComponent<{ title: string }> = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
      />
    </NextHead>
  )
}

export default PageHead
