import { useState, useEffect, useRef } from 'react';
import { useNavigate, state } from 'react-router-dom';
import { useLocation } from 'react-router';
import { addProduct } from '../api/productsAPI';
import { getBigCategory, getChildCategory } from '../api/categoryAPI';
import ManageImage from '../components/ManageImage';

const ManageProductNew = () => {
  let { state } = useLocation();
  const { categories } = state;
  const { brands } = state;
  const { typeSubCategories } = state;

  //category 가져오기
  let p_id = '';
  const [bigCategory, setBigCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryId, setcategoryId] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    getBigCategory().then((response) => {
      setBigCategory(response);
    });
  };

  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleBigCategory = (e) => {
    getChildCategory(e.target.value).then((res) => {
      setParentCategoryId(e.target.value);
      setChildCategory(res);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('mmmm', parentCategoryId);
    if (product.title.length < 5) {
      alert('상품 이름은 5글자 이상 입력하세요');
    }

    const jsonData = {
      title: product.title,
      category_id: [parentCategoryId, categoryId],
      model_number: product.model_number,
      price: product.price,
      gender: product.gender,
      size: product.size,
    };

    const response = await addProduct(jsonData);

    alert('상품이 추가되었습니다.');
    const { _id } = response;
    navigate(`/productedit/${_id}`, {
      state: {
        categories: categories,
        item: response,
        // categories: selectedCategories,
        brands: brands,
        typeSubCategories,
      },
    });
    // navigate(-1);
  };

  return (
    <div className='div__manage-product-add-content'>
      <div className='div__manage-product-add-content-wrap'>
        <h2 className='div__h2--product-add-title'>상품 추가</h2>
        <form
          onSubmit={handleSubmit}
          className='div__form--manage-product-edit'
        >
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
                id='title'
                name='title'
                value={product.title}
                onChange={handleInputChange}
                className='form__input--input-value-style'
                placeholder='제품명을 입력해 주세요.'
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
                id='model_number'
                name='model_number'
                value={product.model_number}
                onChange={handleInputChange}
                className='form__input--input-value-style'
                placeholder='모델명을 입력해 주세요.'
              />
            </div>
            <div className='div__div--button-flex'>
              <div>
                <label
                  htmlFor='type'
                  className='form__label--input-title-hidden'
                >
                  대분류:
                </label>
                <select
                  id='type'
                  onChange={handleBigCategory}
                  className='form__input--input-value-style form__input--input-value-style-type'
                >
                  <option>대분류를 선택하세요.</option>

                  {bigCategory.map((item) => (
                    <option value={item['_id']} key={item['_id']}>
                      {item['name']}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor='brand'
                  className='form__label--input-title-hidden'
                >
                  소분류를 선택하세요
                </label>
                <select
                  id='brand'
                  name='brand'
                  onChange={(e) => {
                    setcategoryId(e.target.value);
                  }}
                  className='form__input--input-value-style form__input--input-value-style-brand'
                >
                  <option>소분류를 선택하세요.</option>

                  {childCategory.map((item) => (
                    <option value={item['_id']} key={item['_id']}>
                      {item['name']}
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
                id='price'
                name='price'
                placeholder='가격을 입력해 주세요.'
                value={product.price}
                onChange={handleInputChange}
                className='form__input--input-value-style'
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
                id='type'
                name='gender'
                value={product.gender}
                onChange={handleInputChange}
                className='form__input--input-value-style'
              >
                <option>성별을 선택하세요.</option>
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
                id='size'
                name='size'
                value={product.size}
                onChange={handleInputChange}
                placeholder='사이즈를 입력해 주세요.'
                className='form__input--input-value-style'
              />
            </div>
            <div className='control_box'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='div__button--product-cancel-button'
              >
                취소하기
              </button>
              <button type='submit' className='div__button--product-add-button'>
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProductNew;
