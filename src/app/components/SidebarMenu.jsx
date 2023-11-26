import { GiBasketballBasket, GiSoccerField, GiTennisCourt  } from "react-icons/gi";
import { PiVolleyballThin } from "react-icons/pi";
import { LiaRunningSolid } from "react-icons/lia";
import { GiHighKick } from "react-icons/gi";
import Link from 'next/link'


const SidebarMenu = () => {
  return (
    <>
        <h3 className='text-lg font-semibold tracking-wide'>Sports</h3>

        <Link href="basketball" className='flex items-center gap-2'>
            <GiBasketballBasket size={26} />
            <p className='text-[14px]'>Basketball</p>
        </Link>
        
        <Link href="basketball" className='flex items-center gap-2'>
            <GiSoccerField size={26} />
            <p className='text-[14px]'>Football</p>
        </Link>
    
        <Link href="basketball" className='flex items-center gap-2'>
            <PiVolleyballThin size={26} />
            <p className='text-[14px]'>Valleyball</p>
        </Link>
    
        <Link href="basketball" className='flex items-center gap-2'>
            <GiTennisCourt size={26} />
            <p className='text-[14px]'>Tennis</p>
        </Link>
    
        <Link href="basketball" className='flex items-center gap-2'>
            <LiaRunningSolid size={26} />
            <p className='text-[14px]'>Running</p>
        </Link>
    
        <Link href="basketball" className='flex items-center gap-2'>
            <GiHighKick size={26} />
            <p className='text-[14px]'>Martial Arts</p>
        </Link>
            
    </>
  )
}

export default SidebarMenu