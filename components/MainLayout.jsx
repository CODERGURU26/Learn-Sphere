import React from 'react'
import {AntdRegistry} from '@ant-design/nextjs-registry'

const MainLayout = ({children}) => {
  return (
    <AntdRegistry>
        <div>{children}</div>
    </AntdRegistry>
    
  )
}

export default MainLayout