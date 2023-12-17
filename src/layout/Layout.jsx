import { Outlet } from "react-router-dom"
import { NovuProvider } from "@novu/notification-center"

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout