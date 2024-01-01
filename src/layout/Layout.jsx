import { Outlet , useLocation} from "react-router-dom"
import { useState } from "react"
import { NovuProvider } from "@novu/notification-center"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"

const Layout = () => {
 const location = useLocation()

 const [openMenu , setOpenMenu] = useState(false)
 const not = location.pathname == '/login' || location.pathname == '/signup' || location.pathname == '/reset_password' 

    return (
        <main className="">
   {!not && 
    <Navbar
    setOpenMenu={setOpenMenu} />
   }
  <div className='relative'>
    <div className={` lg:max-w-[20vw] ${!openMenu && "hidden lg:flex  " }${not && 'hidden lg:hidden'} fixed top-0 left-0 z-50`}>
  <Sidebar />
  </div >
  <div  className="lg:max-w-[80vw] relative flex justify-center w-full lg:float-right">
    <Outlet />
    </div>
    </div>
        </main>
    )
}

export default Layout