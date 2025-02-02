"use client"
import { useAuth } from "@/context/authContext"
import { useState, useEffect, useCallback } from "react"
// import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import SidebarItem from "./SidebarItem"
import { HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from "react-icons/hi2"
import { sidebarItems } from "@/utils"

const Sidebar = () => {
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const isItemActive = (icon) => {
    return icon.matchPath.test(pathname)
  }

  const handleNavigation = (path) => { router.push(path) }

  const classIcon = "cursor-pointer hover:bg-secondary rounded text-2xl inline-block"

  useEffect(() => {
    // Abrir - cerrar el sidebar con el comando (Ctrl + B)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  return (
    <aside
      className={`relative h-screen bg-primary text-white transition-all duration-300 ${isOpen ? "w-56" : "w-14"} overflow-y-auto z-50`}
    >
      <header className={`p-4 ${isOpen ? "text-right" : "text-center"}`}>
        {isOpen ? <HiMiniChevronDoubleLeft onClick={toggleSidebar} className={classIcon} /> :
          <HiMiniChevronDoubleRight onClick={toggleSidebar} className={classIcon} />}
      </header>
      {/* <div className="flex justify-center px-4 transition-transform duration-300">
        <Image src="/favicon.ico" alt="logo" width={isOpen ? 90 : 35} height={isOpen ? 90 : 35}/>
      </div> */}
      <nav className="mt-10">
        <ul className={`px-4 ${isOpen ? "" : "flex flex-col items-center"}`}>
          {sidebarItems.map((icon, index) => (
            <SidebarItem
              key={index}
              icon={icon.icon}
              text={icon.text}
              path={icon.path}
              isOpen={isOpen}
              isActive={isItemActive(icon)}
              onClick={() => handleNavigation(icon.path)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar