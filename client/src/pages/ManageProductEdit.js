import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, state } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';
import { updateProduct, getBrands } from '../api/productsAPI';
import { getChildCategory, getBigCategory } from '../api/categoryAPI';
import ManageImage from '../components/ManageImage';
import baseShoeImage from '../image/base_product_image.png';
import axios from 'axios';

const ManageProductEdit = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [brands, setBrands] = useState([]);

  const getBrandAndProduct = async () => {
    const brandList = await getBrands();
    setBrands(brandList);
  };
  const setProductData = async () => {
    const data = await axios
      .get(`/api/products/${product_id}`)
      .then((res) => res.data);
    setProduct(data);
  };

  useEffect(() => {
    getBrandAndProduct();
    setProductData();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.title.length < 5) {
      alert('상품 이름은 5글자 이상 입력하세요');
      return;
    }

    const jsonData = {
      title: product.title,
      model_number: product.model_number,
      brand: product.brand,
      price: product.price,
      gender: product.gender,
      size: product.size,
    };

    const response = await updateProduct(product._id, jsonData);
    alert('상품이 수정되었습니다.');
    navigate(-1);
  };

  let imgSrc = '';
  const baseImgSrc = baseShoeImage;
  if (product.main_images?.length) {
    if (product.main_images[0]) {
      imgSrc = product.main_images[0].url;
    } else {
      imgSrc = baseImgSrc;
    }
  } else {
    imgSrc = baseImgSrc;
  }

  return (
    <div className='div__manage-product-add-content'>
      <div className='div__manage-product-add-content-wrap'>
        <h2 className='div__h2--product-edit-title'>상품 정보 수정</h2>
        <form onSubmit={handleSubmit} className='div__form--product-edit-form'>
          <img
            src={imgSrc}
            alt='상품 이미지'
            className='form__img--image-size'
          />
          <div className='div__div--input-list-wrap'>
            <div>
              <label
                htmlFor='title'
                className='form__label--input-title-hidden'
              >
                제품명
              </label>
              <input
                type='text'
                className='form__input--input-value-style'
                name='title'
                value={product?.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor='model_number'
                className='form__label--input-title-hidden'
              >
                모델번호
              </label>
              <input
                type='text'
                className='form__input--input-value-style'
                name='model_number'
                value={product?.model_number}
                onChange={handleInputChange}
              />
            </div>
            <div className='div__div--button-flex'>
              <div>
                <label
                  htmlFor='brand'
                  className='form__label--input-title-hidden'
                >
                  브랜드
                </label>
                <select
                  id='brand'
                  className='form__input--input-value-style form__input--input-value-style-brand form__input--input-value-style-modify-brand'
                  name='brand'
                  value={product?.brand}
                  onChange={handleInputChange}
                >
                  <option>브랜드를 선택해 주세요</option>

                  {brands.map((brand, idx) => (
                    <option value={brand._id} key={idx}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor='price'
                className='form__label--input-title-hidden'
              >
                가격
              </label>
              <input
                type='text'
                className='form__input--input-value-style'
                name='price'
                value={product?.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor='gender'
                className='form__label--input-title-hidden'
              >
                성별
              </label>
              <select
                className='form__input--input-value-style'
                name='gender'
                value={product?.gender}
                onChange={handleInputChange}
              >
                <option>성별을 선택하세요</option>
                <option value={'BOTH'}>모두</option>
                <option value={'MALE'}>남성</option>
                <option value={'FEMALE'}>여성</option>
              </select>
            </div>
            <div>
              <label htmlFor='size' className='form__label--input-title-hidden'>
                사이즈
              </label>
              <input
                type='text'
                className='form__input--input-value-style'
                name='size'
                value={product?.size}
                onChange={handleInputChange}
              />
            </div>
            <div className='control_box'>
              <button
                className='div__button--product-cancel-button'
                onClick={() => navigate(`/manageproducts`)}
              >
                수정취소
              </button>
              <button type='submit' className='div__button--product-add-button'>
                수정완료
              </button>
            </div>
          </div>
        </form>
        <ManageImage prd={product}></ManageImage>
      </div>
    </div>
  );
};

export default ManageProductEdit;
