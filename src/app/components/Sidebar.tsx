import React from 'react'
import SidebarMenu from '@/components/SidebarMenu'

const Sidebar = () => {
  return (
    <div className='hidden lg:block lg:w-72 xl:w-80  transition-all duration-300 border-r border-input'>
      <div className='fixed min-w-72 flex flex-col items-start gap-7 p-8 mt-20'>
        <SidebarMenu />
      </div>
    </div>
  )
}

export default Sidebar