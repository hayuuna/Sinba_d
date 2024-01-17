import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getBrands, getProducts } from '../api/productsAPI';
import CategoryBar from './CategoryBar';
import Pagination from './Pagination';
import Products from './Products';
import '../css/btn.css';
const ProductList = () => {
  const { listType } = useParams();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [total, setTotal] = useState(1);
  let queryString;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { state } = useLocation();
  useEffect(() => {
    if (state) setSelectedCategories(state);
  }, [state]);

  const getProductList = useCallback(async () => {
    const data = await getProducts(selectedCategories, page);
    const products = data.products;
    const total = data.total;

    const brandList = await getBrands();
    setProducts(products);
    setBrands(brandList);
    setTotal(total);
    updateQueryString();
  }, [selectedCategories, page]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const updateQueryString = () => {
    let queryString =
      selectedCategories.length > 0
        ? `?` + selectedCategories.map((it) => `category_id=${it}`).join('&')
        : '';
    if (!queryString) {
      queryString += '?';
    } else {
      queryString += '&';
    }
    queryString += page ? `page=${page}` : 'page=1';
    window.history.pushState({}, '', window.location.pathname + queryString);
  };

  const paginate = (pageNumber) => setPage(pageNumber);
  return (
    <div className='div__manage-products-content'>
      <div className='div__manage-products-content-wrap'>
        <h2>상품 목록</h2>
        <div>{listType}페이지 입니다</div>
        <h4 className='div__h4--page-name'>{total}개의 상품이 있습니다</h4>
      </div>

      <div className='div__manage-products-content-flex'>
        <CategoryBar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          listType={listType}
          handleCheckboxChange={handleCheckboxChange}
        />

        <div className='div__div--product-list-width'>
          <Products
            products={products}
            loading={loading}
            brands={brands}
            productStyle='list-product'
            productStyle2='list-product2'
          />
        </div>
      </div>
      <Pagination setPage={paginate} limit={limit} total={total} page={page} />
    </div>
  );
};
export default ProductList;
