import React from 'react'
import { Link } from 'react-router-dom'

const PamentStatusPage = () => {
  return (
    <>
        <header className="py-5" style={{backgroundColor : "#6050DC"}}> 
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-5 fw-bolder">Payment Status</h1>
                    <p className="lead fw-normal text-white-50 mb-0">
                        Check the status of your payment here
                    </p>
                </div>
            </div>
        </header>
        <main className="py-5">
            <div className="container px-4 px-lg-5 mb-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <Link to="/orders">
                        <button className="btn btn-primary">
                            View Order Details
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="btn btn-primary">
                            continue shopping
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    </>
  )
}

export default PamentStatusPage
