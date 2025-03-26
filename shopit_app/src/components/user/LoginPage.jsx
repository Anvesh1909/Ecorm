import React, {useContext, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {

    const {handleAuth, handleLogout, getUsername} = useContext(AuthContext);

    const location = useLocation()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(username, password)
        setLoading(true)
        api.post('token/', {username, password})
        .then(response => {
            console.log(response)
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            setUsername('')
            setPassword('')
            setError('')
            getUsername();

            handleAuth();
            toast.success('Login successful!');
            if(location.state){
                navigate(location.state.from.pathname,{replace: true})
            } else {
                navigate('/',{replace: true});
            }
        })
        .catch(error => {
            console.log(error)
            setError(error.response.data.detail);
            toast.error(error.response.data.detail || 'Login failed');
        })
        .finally(() => {
            setLoading(false)
        })
    }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      id="password" 
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      disabled={loading}
                    />
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" disabled={loading} />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>

                <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                </div>

                <div className="text-center mt-3">
                  <p className="mb-0">Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
