import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
  <nav className='flex justify-around bg-gradient-to-r from-blue-500 via-blue-600 to-gray-500   text-white py-4'>
<div className="logo font-serif font-bold text-3xl ">SCHOOL</div>
<ul className='flex  font-bold gap-5  text-lg'>
<Link href="/ " >Home</Link>
<Link href="/addschool" >AddSchool</Link>
<Link href="/getschool" >Show School</Link>
</ul>
  </nav>
  )
}

export default Navbar
