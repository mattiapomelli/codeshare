import { FunctionComponent } from 'react'
import Logo from '@/components/Logo'

const BlankLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Logo vertical style={{ paddingTop: '3rem' }} />
      {children}
    </>
  )
}

export default BlankLayout
