import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import baseProductImgage from '../image/base_product_image.png';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 데이터 상태
  const [data, setData] = useState([]);

  // 데이터 get해오는 useEffect
  useEffect(() => {
    axios
      .get(`/api/products/${id}`)

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류 발생: ', error);
      });
  }, []);

  const addToCart = () => {
    const getAllCartProducts = () => {
      const allProducts = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('cartProduct_')) {
          const product = JSON.parse(localStorage.getItem(key));
          allProducts.push(product);
        }
      }
      return allProducts;
    };

    const previousStorage = getAllCartProducts();
    const isDuplication = previousStorage.some((item) => item._id === data._id);

    if (!isDuplication) {
      const key = `cartProduct_${data._id}`;
      const cartData = { ...data, count: 1 }; // 상품 데이터에 count 값을 추가
      localStorage.setItem(key, JSON.stringify(cartData));
      alert('장바구니에 상품이 추가되었습니다.');
    } else {
      alert('이미 장바구니에 상품이 있습니다.');
    }
  };

  const imgSrc =
    data.main_images?.length && data.main_images?.[0]
      ? data.main_images?.[0].url
      : baseProductImgage;

  return (
    <div>
      <div className='body__div--detail-content'>
        {/* 상품 정보 */}

        <div className='div__div--info-flex'>
          <div className='div__div--product-img'>
            <img src={imgSrc} />
            {/* {data?.main_images?.map((image, index) => {
              return <img src={data.main_images[0].url} key={index} />;
            })} */}
          </div>
          <div className='div__div--info-text'>
            <p className='div__p--brand-name'>{data.brand}</p>
            <p className='div__p--product-name'>{data.title}</p>
            <p className='div__p--price'>{`${data.price} 원`}</p>

            <select className='div__select--select-style'>
              <option value='' disabled hidden>
                {/* 사이즈 선택 */}
              </option>
              {/* 해당 데이터의 사이즈를 전부 펼쳐야함 */}
              {/* {data?.map((item, index) => (
                <option key={index}>{item.size}</option>
              ))} */}
              <option>{data.size}</option>
            </select>
            <form>
              <input
                onClick={() => {
                  navigate('/PurchaseCompleted');
                }}
                type='button'
                value='구매하기'
                className='form__input--purchase-button-style'
              />

              <input
                type='button'
                value='장바구니'
                className='form__input--cart-button-style form__input--cart-button'
                onClick={addToCart}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
