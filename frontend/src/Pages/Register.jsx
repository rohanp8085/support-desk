import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authslice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authslice'
const Register = () => {

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",


  })

  const { name, email, password, password2 } = formData


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("password not match")
    }
    dispatch(registerUser(formData))
  }


  useEffect(() => {

    if (isError) {
      toast.error(message)
    }
    if (user || isSuccess) {
      navigate("/")
    }

    dispatch(reset())
  }, [user, isLoading, isSuccess, isError, message])

  return (
    <>
      <section className="heading">
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={handleChange}
              value={name}
              name="name"

              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              onChange={handleChange}
              value={password2}
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
