import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white flex justify-between px-4 items-center h-12'>
      <div className='logo font-bold'>FundMe</div>
      <ul className='flex justify-between gap-4'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>SignUp</li>
        <li>Login</li>
      </ul>
    </nav>
  )
}

export default Navbar
