import React from 'react'
import { NavLink } from 'react-bootstrap'

const Header = () => {
  return (
    <header className='header'>
      <NavLink className='header__title' to='/'>
        <img className='header__logo' src='/images/logo.png' alt='Logo' />
        <h1>Task WorkFlow</h1>
      </NavLink>
    </header>
  )
}

export default Header
