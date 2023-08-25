import { useRef, useState} from "react";
import { Navigate } from "react-router-dom";
import { createProduct } from "../../services/productServices";

const Creator = () => {

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const aboutRef = useRef();
  const availableRef = useRef();
  const colorRef = useRef();
  const brandRef = useRef();
  const imageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      about: aboutRef.current.value,
      // available: availableRef.current.value,
      color: colorRef.current.value,
      brand: brandRef.current.value,
      images: imageRef.current.files
    }

    const images = imageRef.current.files;


    console.log("in comp  ", images)
    onPostProduct(formData)
      .then((res) => console.log(res))
  }

  const onPostProduct = (obj) => {
    const res = createProduct(obj)
    return res
  }

  const categoryArr = [
    'office',
    'living room',
    'kitchen', 
    'bedroom', 
    'dining', 
    'kids'
  ]

  const categoryOptions = categoryArr.map((item, index) => {
    return <option key={index} className=" text-capitalize" value={item}>{item}</option>
  })

  const colorArr = [
    'red', 
    'green', 
    'blue', 
    'yellow', 
    'black', 
    "white"
  ]

  const colorOptions = colorArr.map((item, index) => {
    return <option key={index} className=" text-capitalize" value={item}>{item}</option>
  })

  const brandArr = ['liddy', 'ikea', 'jysk']

  const brandOptions = brandArr.map((item, index) => {
    return <option key={index} className=" text-capitalize" value={item}>{item}</option>
  })


  return (
    <div className="creator-section">
      <div className="form-container d-flex justify-content-center align-items-center mx-auto">
        <form action="creator" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-block row row-cols-1">
            <h3 className="text-center mb-3">Just provide any data</h3>
            <div className="col mb-2">
              <label htmlFor="Name">Name</label>
              <input type="text" 
                name="Name"
                id="Name"
                ref={nameRef} 
                className="form-control"
                required/>
            </div>
            <div className="col mb-2">
              <label htmlFor="category">Category</label>
              <select className="form-select" 
                name="category" 
                id="category"
                ref={categoryRef}
                required>
                  <option className=" text-capitalize" value="">Please choose the option</option>
                  {categoryOptions}
              </select>
            </div>
            <div className="col mb-2">
              <label htmlFor="price">Price</label>
              <input type="number"
              min={0}
              max={10000}
                name="price" 
                id="price" 
                ref={priceRef}
                className="form-control"
                required/>
            </div>
            <div className="col mb-2">
              <label htmlFor="color">Color</label>
              <select className="form-select" 
                name="color" 
                id="color"
                ref={colorRef}
                >
                  <option className=" text-capitalize" value="">Please choose the option</option>
                  {colorOptions}
              </select>
            </div>
            <div className="col mb-2">
              <label htmlFor="brand">Brand</label>
              <select className="form-select" 
                name="brand" 
                id="brand"
                ref={brandRef}
                >
                  <option className=" text-capitalize" value="">Please choose the option</option>
                  {brandOptions}
              </select>
            </div>

            <div className="col mb-2">
              <label htmlFor="image">Upload the image</label>
              <input type="file" 
                multiple
                name="image"
                id="image"
                accept="image/*"
                ref={imageRef} 
                className="form-control"/>
            </div>


            <div className="col mb-3">
              <label htmlFor="available" className="me-1">Is available</label>
              <input type="checkbox"
                name="available" 
                id="available" 
                ref={availableRef}
                className="form-check-input"/>
            </div>


            <div className="col mb-3">
              <label htmlFor="about">About</label>
              <textarea
                name="about" 
                id="about" 
                ref={aboutRef}
                className="form-control"/>
            </div>

            <div>
              <span>
                {/* {logStatus} */}
              </span>
            </div>
            <div className="col d-flex justify-content-center">

              <button type="submit"
                className="btn w-100 fw-bold submit-btn">
                  Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Creator