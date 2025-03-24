import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({loading}) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#6050DC",
  };

  
  return (
    <>
    {loading && <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
    <ClipLoader
      color="#6050DC"
      loading={true}
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>}</>
  )
}

export default Spinner
