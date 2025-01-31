"use client"
import { useState, useEffect } from "react"
import Loading from "@/components/Loading"

const HomePage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div>
      <h3 className="text-2xl text-white">Bienvenid@, {user ? user.fullname : <Loading />}</h3>
    </div>
  )
}

export default HomePage 