import React, { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts';
import ProductPagePlaceHolder from './ProductPagePlaceHolder';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import { BASE_URL } from '../../api';

const ProductPage = ({setNumberCartItems}) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const cart_code = localStorage.getItem("cart_code");
  const newItem = {cart_code: cart_code, product_id: product.id}

  const [inCart,setInCart] = useState(false);

  useEffect(function(){
    if(product.id){
        api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res =>{
            console.log(res.data)
            setInCart(res.data.product_in_cart)
        })
        .catch(err=>{
            console.log(err.message)
        }) 
    }
  },[cart_code,product.id])

  function add_item(){
    api.post('add_item/',newItem)
    .then(res=>{
        console.log(res.data);
        setInCart(true);
        setNumberCartItems(curr => curr+1);
        toast.success('Item added to cart!', {
            position: "top-right",
            autoClose: 2000,
        });
    })
    .catch(err => {
        console.log(err.message);
        toast.error('Failed to add item to cart!', {
            position: "top-right",
            autoClose: 2000,
        });
    })
  }

  useEffect(() => {
      setLoading(true);
      api.get(`product_detail/${slug}`)
          .then(res => {
              console.log(res.data);
              setProduct(res.data);
              setSimilarProducts(res.data.similar_products);
          })
          .catch(err => {
              console.log(err.message);
          })
          .finally(() => {
              setLoading(false);
          });
  }, [slug]);

  return (
      <div>
          {loading ? <ProductPagePlaceHolder /> : (
              <section className="py-3">
                  <div className="container py-4 px-lg-5 my-5">
                      <div className="row gx-4 gx-lg-5 align-items-center">
                          <div className="col-md-6">
                              <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '8px' }}>
                                  <img 
                                      className="w-100 h-100" 
                                      style={{ objectFit: 'cover' }}
                                      src={`${BASE_URL}${product.image}` || "oskdjc"} 
                                      alt={product?.name || "Product"} 
                                  />
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="small mb-1">SKU: BST-498</div>
                              <h1 className="display-5 fw-bolder">{product?.name || "Product Name"}</h1>
                              <div className="fs-5 mb-5">
                                  {product?.originalPrice && <span className="text-decoration-line-through">₹{product.originalPrice}</span>}
                                  <span> ₹{product?.price || "N/A"}</span>
                              </div>
                              <p className="lead">{product?.description || "No description available."}</p>
                              <div className="d-flex">
                                  {/* <input className="form-control text-center me-3" id="inputQuantity" type="number" defaultValue="1" style={{ maxWidth: '3rem' }} /> */}
                                  <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={add_item} disabled={inCart}>
                                      <i className="bi-cart-fill me-1"></i> 
                                      { inCart ? "Product added to cart" : "Add to cart"}
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          )}
          <RelatedProducts products={similarProducts} />
      </div>
  );
};

export default ProductPage;
