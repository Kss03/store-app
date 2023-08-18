import { useRef, useState, useEffect } from "react"
import {useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogin } from "../../reducers/Login/Login";

import { postLogin } from "../../services/loginServices";

const Login = () => {

  const {location} = useLocation().state
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [logStatus, setLogStatus] = useState()

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
  
    onSubmitLogin(formData)
      .then((res) => {
        if (res.status === 200) {
          const {token, username, msg} = res.data

          localStorage.token = token
          localStorage.userName = username
          setLogStatus(msg)
          setTimeout(() => {
            dispatch(onLogin())
            navigate(location)
          }, 2000)
        } 
        if (res.request.status === 400) {
          console.log(res)
          setLogStatus(res.response.data.msg)
        }
      })
      .catch((rej) => {
        console.log(rej)
      });
  }

  const onSubmitLogin = (userData) => {
    const res = postLogin(userData)
    return res
  }

  return (
    <div className="login-section">
      <div className="form-container d-flex justify-content-center align-items-center mx-auto">
        <form action="login" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-block row row-cols-1">
            <h3 className="text-center mb-3">Just provide any data</h3>
            <div className="col mb-2">
              <label htmlFor="userName">User Name</label>
              <input type="text" 
                name="userName"
                id="userName"
                ref={userNameRef} 
                className="form-control"/>
            </div>
            <div className="col mb-2">
              <label htmlFor="email">Email</label>
              <input type="email"
                placeholder="name@mail.com"
                name="email"
                id="email" 
                ref={emailRef}
                className="form-control"/>
            </div>
            <div className="col mb-3">
              <label htmlFor="password">Password</label>
              <input type="password"
                name="password" 
                id="password" 
                ref={passwordRef}
                className="form-control"/>
            </div>
            <div>
              <span>
                {logStatus}
              </span>
            </div>
            <div className="col d-flex justify-content-center">

              <button type="submin"
                className="btn w-100 fw-bold login-btn">
                  Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;