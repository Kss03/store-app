import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {v4} from 'uuid'
import MediaQuery from "react-responsive"
import {useMediaQuery} from "react-responsive"

//service
import {getProducts} from "../../services/productServices"

import { Sorting } from "../Products/Products"

const FilterBar = ({onGetProducts, sortItems, setSortBy}) => {

  //value from input
  const [nameInput, setNameInput] = useState('')
  //finded items 
  const [fastSearch, setFastSearch] = useState([])
  //focus on input
  const [inputFocused, setInputFocused] = useState(false)
  //companySelect
  const [brandRadio, setBrandRadio] = useState('')
  //categoryRadio
  const [categoryRadio, setCategoryRadio] = useState('')
  //categoryRadio
  const [colorRadio, setColorRadio] = useState('')
  //priceInputs
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(10000)

  //collapse filters on mobile
  const [isCollapse, setIsCollapse] = useState(true);

  useEffect(() => {
    getProductsOnInput()
  }, [nameInput])

  const onSubmitForm = (e) => {
    e.preventDefault()
    let formData = {
      name: nameInput,
      brand: brandRadio,
      category: categoryRadio,
      color: colorRadio,
      priceRange: priceMin + ', ' + priceMax
    }
    onGetProducts(formData)
  }

  const onTypeInput = (e) => {
    setNameInput(e.target.value)
  }

  const getProductsOnInput = () => {
    if (nameInput) {
      getProducts({name: nameInput})
        .then((data) => setFastSearch(data.products))
        .catch((error) => console.log(error))
        return
    } else {
      setFastSearch([])
    }
  }


  const categoryArray = [
   'Office', 'Living Room', 'Kitchen', 'Bedroom', 'Dining', 'Kids'
  ]

  //create items for category block
  const categoryItems = categoryArray.map((item, index) => {
    return (
      <div key={index}>
        <input type="radio" className="btn-check" name='category' value={item} id={'category' + item} autoComplete="off" />
        <label className=" btn px-3 py-0" for={'category' + item}>{item}</label>
      </div>
    )
  })


  // just correct work for price inputs
  const onPriceMin = (e) => {
    const actualMinPrice = Number(e.target.value)
    if (actualMinPrice > priceMax) {
      setPriceMax(actualMinPrice)
    }
    setPriceMin(actualMinPrice)
  }

  const onPriceMax = (e) => {
    const actualMaxPrice = Number(e.target.value)
    if (actualMaxPrice < priceMin) {
      setPriceMin(actualMaxPrice)
    }
    setPriceMax(actualMaxPrice)
  }

  const onReset = () => {
    setPriceMax(10000)
    setPriceMin(0)
    setNameInput('')
    setBrandRadio('')
    setCategoryRadio('')
    setColorRadio('')

  }

  //to show div with finded items under the name input
  const showFastSearch = inputFocused ? 'd-block' : 'd-none';

  //create items for fast search block
  const searchedItems = fastSearch.map((item) => {
    const {name, price, _id} = item;

    return (
      <div key={v4()} className="item d-flex">
        <Link to={`/products/${_id}`} className=" link fw-bold me-1 text-nowrap me-auto">{name}</Link>
        <span className="text-nowrap">{price}&nbsp;$</span>
      </div>
    )
  })

  //collapse class 
  const isMobile = useMediaQuery({query: '(max-width: 991.98px)'})
  const collapseClass = (isCollapse && isMobile) ? 'collapse' : null


  return(
    <div className="filter-bar">
      <MediaQuery maxWidth={991.98}>
        <div className="row justify-content-between">
          <div className="col-6 col-md-4">
            <button type="button" 
              className=" btn filter-btn"
              data-bs-toggle="collapse" 
              data-bs-target="#collapseFilter" 
              aria-expanded="false" 
              aria-controls="collapseFilter"
              onClick={() => setIsCollapse(!isCollapse)}>
                Filters
            </button>
          </div>
          <div className="col-6 col-md-4">
            <Sorting sortItems={sortItems} setSortBy={setSortBy}/>
          </div>
        </div>
      </MediaQuery>
      <form className= {` ${collapseClass} filter-form`} action="" onSubmit={onSubmitForm}>
        <div className="form-control position-relative"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 100)}>
            <h5 className="form-control__title">Search</h5>
            <input 
              onChange={(e) => onTypeInput(e)} 
              type="search" 
              name="name"
              placeholder="type the name..."
              className="form-input"
              autoComplete="off"
            />
            <div className={` ${showFastSearch} position-absolute top-100 fast-search-block`}>
              {searchedItems}
            </div>
        </div>
        <div className="form-control">
          <h5 className="form-control__title">
            Category
          </h5>
          <div className="d-flex flex-column align-items-start" onChange={(e) => setCategoryRadio(e.target.value)}>
              <input type="radio" className="btn-check" name='category' value='' id='category-all' autoComplete="off" />
                <label className="btn px-3 py-0" for='category-all'>All</label>
            {categoryItems}
          </div>
        </div>
        <div className="form-control">
          <h5 className="form-control__title">Company</h5>
          <select name="company" id="company" className="form-select selectbar" onChange={(e) => setBrandRadio(e.target.value)}>
            <option className="selectbar-option" value=''>
              All
            </option>
            <option className="selectbar-option" value='jysk'>
              JYSK
            </option>
            <option className="selectbar-option" value='ikea'>
              IKEA
            </option>
            <option className="selectbar-option" value='liddy'>
              LIDDY
            </option>
          </select>
        </div>
        <div className="form-control">
          <h5 className="form-control__title">Color</h5>
          <div className="colors" onChange={(e) => setColorRadio(e.target.value)}>
              <input type="radio" className="btn-check" name='colors' value='' id="all" autoComplete="off"/>
                <label className="btn p-0 me-1" for='all'>All</label>

              <input type="radio" className="btn-check" name='colors' value='red' id="color-red" autoComplete="off"/>
                <label className="border-2 color-btn btn p-0 me-1 rounded-circle bg-danger" for='color-red'></label>
  
              <input type="radio" className="btn-check" name='colors' value='green' id="color-green" autoComplete="off"/>
                <label className="border-2 color-btn btn p-0 me-1 rounded-circle bg-success" for='color-green'></label>
  
              <input type="radio" className="btn-check" name='colors' value='blue' id="color-blue" autoComplete="off"/>
                <label className="border-2 color-btn btn p-0 me-1 rounded-circle bg-primary" for='color-blue'></label>
  
              <input type="radio" className="btn-check" name='colors' value='black' id="color-black" autoComplete="off"/>
                <label className="border-2 color-btn btn p-0 me-1 rounded-circle bg-dark" for='color-black'></label>
  
              <input type="radio" className="btn-check" name='colors' value='white' id="color-white" autoComplete="off"/>
                <label className="border-2 color-btn btn p-0 me-1 rounded-circle color-white" for='color-white'></label>
  
              <input type="radio" className="btn-check" name='colors' value='yellow' id="color-yellow" autoComplete="off"/>
                <label className="border-2 color-btn btn p-0 rounded-circle bg-warning" for='color-yellow'></label>
          </div>
        </div>
        <div className="form-control">
          <h5 className="form-control__title">Price</h5>
          <p className="mb-0 mt-2 h5">{priceMin}&nbsp;$</p>
          <input className="price-range" type="range" name="min" min="0" max="10000" value={priceMin} onChange={(e) => onPriceMin(e)}/>
          <p className="mb-0 mt-2 h5">{priceMax}&nbsp;$</p>
          <input className="price-range" type="range" name="max" min="0" max="10000" value={priceMax} onChange={(e) => onPriceMax(e)}/>
        </div>
        <div className="form-control d-flex flex-column align-items-start">
          <button type="submit" 
            className="btn submit-button mb-2"
            onClick={() => setIsCollapse(true)}>Search</button>
          <button type="reset" 
            className="btn button-reset" 
            onClick={() => {
                onReset()
              }}>
                Clear filters
          </button>
        </div>
      </form>
    </div>
  )
}

export default FilterBar