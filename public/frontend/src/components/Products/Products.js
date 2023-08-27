import { useState, useEffect } from "react"
import MediaQuery from "react-responsive"

import ProductList from "../ProductList/ProductList"
import FilterBar from "../FilterBar/FilterBar"
import {getProducts} from "../../services/productServices"
import Loading from "../Loading/Loading"
import ErrorMessage from "../Error/ErrorMessage"

const Products = () => {

  const sortItems = {
    priceLowest: 'price-lowest',
    priceHighest: 'price-highest',
    aToZ: 'a-z',
    zToA: 'z-a',
  }

  const [productsData, setProductsData] = useState();
  const [dataLength, setDataLength] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const [sortBy, setSortBy] = useState(sortItems.priceLowest);

  //pagination
  const [page, setPage] = useState(1);

  //card type
  const [cardType, setCardType] = useState("grid");

  useEffect(() => {
    onGetProducts()
  }, [])

  useEffect(() => {
    onSortData(sortBy)
  }, [sortBy])

  const onGetProducts = async (filterObj) => {
    await getProducts(filterObj)
      .then((data) => {
        onSortData(sortBy, data.products)
        setDataLength(data.arrLength)
      })
      .then(() => setIsLoaded(true))
      .catch((err) => {
        console.log(err)
        setIsError(true)
      })
  }

  const onSortData = (filter, data=productsData) => {
    if (!data) {
      return
    }
    const {priceLowest, priceHighest, aToZ, zToA} = sortItems;
    let items = [];
    items = [...data]
    if (filter === priceLowest) {
      items.sort((a, b) => a.price - b.price)
      setProductsData(items)
    }
    if (filter === priceHighest) {
      items.sort((a, b) => b.price - a.price)
      setProductsData(items)
    }
    if (filter === aToZ) {
      items.sort((a, b) => a.name.localeCompare(b.name))
      setProductsData(items)
    }
    if (filter === zToA) {
      items.sort((a, b) => b.name.localeCompare(a.name))
      setProductsData(items)
    }
    setPage(1)

    return items
  }

  const onSortPages = () => {
    const start = (page - 1) * 9;
    const finish = (page - 1) * 9 + 9;
    const arr = productsData.slice(start, finish)
    return <ProductList cardType={cardType} data={arr} />
  }

  const loading = !isLoaded && !isError ? <Loading /> : null;
  const error = isError ? <ErrorMessage /> : null;
  const productList = isLoaded && !isError ? onSortPages() : null;
  const pagBar = isLoaded && !isError ? <Pagination setPage={setPage} dataLength={dataLength} page={page}/> : null;

  return (
    <section className="product-section pt-4 pt-lg-5 pb-3 pb-lg-4">
      <div className="container">
        <div className="row">
            <div className="col-lg-3 col-xxl-2 col-12">
              <FilterBar onGetProducts={onGetProducts} Sorting={<Sorting/>} sortItems={sortItems} setSortBy={setSortBy}/>
            </div>

          <div className="col-lg-9 col-xxl-10 col-12">
            <MediaQuery minWidth={991.98}>
              <div className="d-flex flex-nowrap justify-content-between align-items-center mb-4">
                <div className="card-type-buttons">
                  <button className={`btn card-type-btn ${cardType === "grid" ? "active-btn" : null}`} onClick={() => setCardType("grid")}>
                    <i class="bi bi-grid"></i>
                  </button>
                  <button className={`btn card-type-btn ${cardType === "list" ? "active-btn" : null}`} onClick={() => setCardType("list")}>
                    <i class="bi bi-view-stacked"></i>
                  </button>
                </div>
                <Sorting setSortBy={setSortBy} sortItems={sortItems}/>
              </div>
            </MediaQuery>
            {loading}
            {error}
            {productList}
            {pagBar}
          </div>

        </div>
      </div>
    </section>
  )
}

const Sorting = ({setSortBy, sortItems}) => {
  const {priceLowest, priceHighest, aToZ, zToA} = sortItems;
  return (
    <div className=" sort-products d-flex justify-content-around align-items-center ms-lg-auto mb-2 mb-lg-0 me-0 pb- pb-lg-0 px-lg-2 overflow-hidden">
    <MediaQuery minWidth={991.98}>
      <span className="sort__title me-2">Sort&nbsp;By: </span>
    </MediaQuery>
    <select name="sorting" id="sorting" className=" selectbar" onChange={(e) => setSortBy(e.target.value)}>
      <option className="selectbar-option" value={priceLowest} default>
        Price (Lowest)
      </option>
      <option className="selectbar-option" value={priceHighest}>
        Price (Highest)
      </option>
      <option className="selectbar-option" value={aToZ}>
        Name (A-Z)
      </option>
      <option className="selectbar-option" value={zToA}>
        Name (Z-A)
      </option>
    </select>
  </div>
  )
}

const Pagination = ({dataLength, setPage, page}) => {

  const pageAmount = Math.ceil(dataLength / 9)

  const styleCurrentPage = 'current-page'

  let pagArr = [];
  for ( let i=1; i <= pageAmount; i++) {
    pagArr.push(
      <button key={i} className={`${page === i ? styleCurrentPage : null} btn-reset p-0 rounded-circle pag-item me-2 me-lg-2 mt-2`} type="button" 
      onClick={() => {
        setPage(i);
        window.scrollTo(0, 0);
      }}>
        {i}
      </button>
    )
  }

  const isDisableBack = page === 1 ? true : false;
  const isDisableNext = page === pageAmount ? true : false;

  return (
    <div className="products__pagination d-flex justify-content-center align-items-center">
      <button className="btn-reset p-0 rounded-circle pag-item me-2 me-lg-2 mt-2" 
        type="button" 
        disabled={isDisableBack} 
        onClick={() => {
          setPage(page - 1);
          window.scrollTo(0, 0);
        }}>
          <i className="bi bi-arrow-left"></i>
      </button>
      {pagArr}
      <button className="btn-reset p-0 rounded-circle pag-item me-2 me-lg-2 mt-2" 
        type="button" 
        disabled={isDisableNext}
        onClick={() => {
          setPage(page + 1);
          window.scrollTo(0, 0);
        }}>
          <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  )
}


export default Products
export {Sorting}