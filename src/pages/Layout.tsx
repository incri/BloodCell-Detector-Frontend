import { Divider } from '@chakra-ui/react'
import Navbar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <Navbar />
    <Divider orientation="horizontal" />
    <Outlet />
    </>
  )
}

export default Layout