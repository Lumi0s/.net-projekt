import { Inter } from "next/font/google"
import { use, useEffect, useState } from "react"
import { themeChange } from "theme-change"
import CitySearchBox from "../components/citySearchBox"
import MainTemp from "../components/weatherScreen"
import { location } from "../types/location"
import FavoriteLocations from "../components/favoriteLocations"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

export default function Home() {
  const [location, setLocation] = useState<location>()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [userID, setUserID] = useState('')
  useEffect(() => {
    themeChange(false)
  }, [location])
  useEffect(() => {
    const userID = localStorage.getItem('userID')
    if (userID) {
      setUserID(userID)
    }
  }, [])

  const themeSelect = (
    <select className="select select-primary" data-choose-theme>
      <option disabled value="">Pick a theme</option>
      <option value="cupcake">Cupcake</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="retro">Retro</option>
    </select>
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginEmail,
        password: loginPassword
      })
      toast("Logged in successfully")
      setUserID(res.data.userId);
      (document.getElementById('login_modal') as HTMLDialogElement).close();
      localStorage.setItem('userID', res.data.userId)
    }
    catch (err) {
      console.error(err)
      toast.error("An error occurred")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email: registerEmail,
        password: registerPassword
      })
      toast.success("Registered successfully");
      (document.getElementById('register_modal') as HTMLDialogElement).close();
      (document.getElementById('login_modal') as HTMLDialogElement).showModal()
    }
    catch (err) {
      console.error(err)
      toast.error("An error occurred")
    }
  }

  return (
    <>
      <div className="min-h-screen w-full gap-4 p-8 pt-4 flex flex-col mainGrid">
        <div className="flex items-center justify-between gap-2">
          <CitySearchBox
            setLocation={(place: location) => setLocation(place)}
            location={location}
          />
          {!userID ? (
            <button
              className="btn btn-primary"
              onClick={() => (document.getElementById('login_modal') as HTMLDialogElement).showModal()}
            >
              Login
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setUserID('')
                toast("Logged out successfully")
                localStorage.removeItem('userID')
              }}
            >
              Logout
            </button>
          )}
        </div>
        <div className="row-span-1 col-span-1 flex justify-end items-center order-first md:order-none">
          {themeSelect}
        </div>

        {/* Login Modal */}
        <dialog id="login_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Login</h3>
            <div className="py-4">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Login</button>
                <div className="text-center">
                  <p>Don't have an account?</p>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      (document.getElementById('login_modal') as HTMLDialogElement).close();
                      (document.getElementById('register_modal') as HTMLDialogElement).showModal();
                    }}
                  >
                    Register here
                  </button>
                </div>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Register Modal */}
        <dialog id="register_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Register</h3>
            <div className="py-4">
              <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Register</button>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      (document.getElementById('register_modal') as HTMLDialogElement).close();
                      (document.getElementById('login_modal') as HTMLDialogElement).showModal();
                    }}
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className="row-span-1 col-span-1 shadow-xl">
          {location ? (
            <MainTemp location={location} />
          ) : (
            <div className="flex flex-col items-center  justify-center w-full">
              <h1 className="text-2xl">Search for a location ↑</h1>
            </div>
          )}
        </div>
        <div className="row-span-1 col-span-1 shadow-xl ">
          <FavoriteLocations
            currentLocation={location}
            changeLocation={(place: location) => setLocation(place)}
            userID={userID}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}