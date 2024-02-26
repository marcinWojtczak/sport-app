'use client'
import React, { useState } from 'react'
import { SlMenu } from "react-icons/sl";
import { Button } from '@/ui/Button';
import SidebarMenu from './SidebarMenu';

const SidebarToggle = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)

    const handleToggleClick = () => {
        setToggleMenu((prevToggleMenu) => !prevToggleMenu);
      };

  return (
    <>
        <Button variant={"ghost"} onClick={handleToggleClick} className="block lg:hidden">
            <SlMenu size={20}/>
        </Button>
        {toggleMenu ? (
          <div className='fixed top-[80px] lg:hidden left-0 w-64 h-full flex flex-col items-start gap-7 p-8 bg-white border-r border-input dark:bg-dark text-slate-950 dark:text-white'>
            <SidebarMenu />
          </div>
        ) : null
        }
    </>
  )
}

export default SidebarToggle