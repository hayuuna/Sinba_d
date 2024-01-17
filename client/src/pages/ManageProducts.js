import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProducts, getBrands, deleteProduct } from '../api/productsAPI';
import ManageProduct from '../components/ManageProduct';
import Pagination from '../components/Pagination';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [typeSubCategories, setTypeSubCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [total, setTotal] = useState(1);

  let queryString;

  useEffect(() => {
    async function getDatas() {
      window.scrollTo(0, 0);
      dataSetting(selectedCategories, page);
    }
    getDatas();
  }, [page]);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  const { state } = useLocation();
  console.log('???', state);
  useEffect(() => {
    if (state) setSelectedCategories(state);
  }, [state]);

  const dataSetting = async () => {
    const data = await getProducts(selectedCategories, page);
    const brandList = await getBrands();

    setProducts(data.products);
    setTotal(data.total);
    setBrands(brandList);
  };

  const getProductList = useCallback(async () => {
    const data = await getProducts(selectedCategories, page);
    // const products = data.products;
    const total = data.total;

    const brandList = await getBrands();

    setProducts(data.products);
    setBrands(brandList);
    setTotal(total);
    updateQueryString();
  }, [selectedCategories, page]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

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

  const handleRemove = async (item) => {
    if (
      window.confirm(
        `${item.title}(${item.model_number})제품을 삭제하시겠습니까?`
      )
    ) {
      await deleteProduct(item._id);
      getProductList();
    }
  };

  const handleEdit = (product) => {
    navigate(`/productedit/${product._id}`, {
      state: {
        item: product,
        brands: brands,
        typeSubCategories,
      },
    });
  };

  return (
    <div className='div__manage-products-content'>
      <div className='div__manage-products-content-wrap'>
        <h2 className='div__manage-products-content-title'>상품관리</h2>
        <h4>{total}개의 상품이 있습니다</h4>
        <div className='div__button--manege-products-button-wrap'>
          <button
            className='div__button--manege-products-button'
            onClick={() =>
              navigate('/productnew', {
                state: {
                  categories: selectedCategories,
                  brands: brands,
                  typeSubCategories,
                },
              })
            }
          >
            상품추가
          </button>
          <Link to='/category'>
            <button
              Link
              to='/category'
              className='div__button--manege-products-button'
            >
              카테고리 관리
            </button>
          </Link>
        </div>
        <div>
          <ManageProduct
            products={products}
            categories={selectedCategories}
            getProductList={getProductList}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            brands={brands}
          />
        </div>
        <Pagination
          setPage={paginate}
          limit={limit}
          total={total}
          page={page}
        />
      </div>
    </div>
  );
};

export default ManageProducts;
