import React from 'react'
import Placeholder from './PlaceHolder'

const PlaceHolderContainer = () => {

  const placeNumber = [...Array(12).keys()].slice(0);

  return (
      <section className="py-5" id='shop'>
        <h4 style={{textAlign:"center"}}>Our Products</h4>
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row justify-conten-center">
              {placeNumber.map(num => <Placeholder key={num} />)}
            </div>
        </div>
      </section>
  )
}

export default PlaceHolderContainer
