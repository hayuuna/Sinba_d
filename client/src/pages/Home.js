import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import visualImage1 from '../image/visualImage1.png';
import { getBrands, getProducts } from '../api/productsAPI';
import Products from '../components/Products';
import trendingimage from '../image/trendingimage.png';

function Home() {
  let slice = 0;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const getProductList = async () => {
    const data = await getProducts('', 1);
    const products = data.products;

    const brandList = await getBrands();
    setProducts(products);
    setBrands(brandList);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    // 메인 비주얼 영역
    <div className='body__div--index-content'>
      <ul className='div__div--visual'>
        {/* 이미지 슬라이더 */}
        <li>
          <img
            src={visualImage1}
            alt='비주얼 이미지1'
            className='li__img--visualimg1'
          />
        </li>
        <div className='div__div--visual-button'>
          <button>이전</button>
          <button>다음</button>
        </div>
      </ul>
      <div className='body__div--index-content-wrap'>
        {/* 베스트 상품 영역 */}
        <div className='div__div--best'>
          <h2 className='div__h2--title'>BEST</h2>
          <Products
            products={products.slice(0, 3)}
            brands={brands}
            productStyle='home-product'
          />
          <br />
          <br />
          <Products
            products={products.slice(3, 6)}
            brands={brands}
            itemClass='home-product-item'
            productStyle='home-product'
          />
        </div>
        {/* Trending */}
        <div className='div__div--trending'>
          <img
            src={trendingimage}
            alt='트렌드이미지'
            className='li__img--trendimage'
          />
          <p className='div__h2--trending-text1'>Own the Floor</p>
          <p className='div__h2--trending-text2'>
            스튜디오 밖에서도 빛나는 스니커즈
          </p>
          <button className='div__h2--trending-buy-button'>구매하기</button>
        </div>
        <div className='div__div--new'>
          {/* 신제품 영역 */}
          <h2 className='div__h2--new-title'>NEW</h2>
          <Products
            products={products.slice(6, 9)}
            brands={brands}
            productStyle='home-product'
          />
          <br />
          <br />
          <Products
            products={products.slice(9, 12)}
            brands={brands}
            productStyle='home-product'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
