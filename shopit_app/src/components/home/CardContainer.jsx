import React from 'react'
import HomeCard from './HomeCard'

const CardContainer = ({products}) => {
  return (
    <section className="py-5" id='shop'>
        <h4 style={{textAlign:'center'}}>Our Products</h4>
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row justify-content-center">
              
            {products.map((product, index) => (
                <HomeCard key={product.id || index} product={product} />
            ))}

            </div>
        </div>
    </section>
  )
}

export default CardContainer;

