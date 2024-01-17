import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChildCategory from '../components/ChildCategory';
import {
  getCategory,
  getBigCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from '../api/categoryAPI';

function Category() {
  const navigate = useNavigate();
  // 데이터 가져오기 변수
  const [bigCategory, setBigCategory] = useState([]);

  // 데이터 보내기 변수
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('default');
  const [parentCategory, setParentCategory] = useState('-1');

  // 대분류 목록 get
  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    getBigCategory().then((response) => {
      setBigCategory(response);
    });
  };

  // 카테고리 삭제 delete
  const deleteData = async (e) => {
    const deleteId = {
      _id: e.target.parentElement.id,
    };
    getCategory();

    await deleteCategory(deleteId);
    refresh();
  };

  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState('');

  // 카테고리 수정 update

  const setInputValue = (e) => {
    setEditMode(true);
    const data = getCategoryById(e.target.id).then((res) => {
      setCategoryId(e.target.id);
      setCategoryName(res.name);
      setCategoryType(res.categoryType);
      setParentCategory(res.parentCategory);
    });
  };
  const updateData = async () => {
    const updateItem = {
      id: categoryId,
      name: categoryName,
      parentCategory,
      categoryType,
    };
    await updateCategory(updateItem);
    alert('업데이트 성공!');
    resetData();
    setEditMode(false);
  };

  const resetData = () => {
    setCategoryName('');
    setCategoryType('');
    setParentCategory('');
  };

  // 카테고리 추가 post
  const createNewData = async (e) => {
    const newCategory = {
      name: categoryName,
      parentCategory: parentCategory,
      categoryType: categoryType,
    };
    await postCategory(newCategory);
  };

  const cancleBtn = () => {
    if (window.confirm('작업을 취소하시겠습니까?')) {
      if (!editMode) {
        resetData();
        alert('상품 페이지로 이동합니다.');
        navigate('/manageproducts');
      } else {
        resetData();
      }
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <div className='body__div--category'>
      <h3 className='div__h3-category-title'>카테고리 관리</h3>
      <div className='body__div--category-wrap'>
        {/* 카테고리 목록 */}

        <div className='div__div--category-list'>
          <p className='div__div--category-list-title'>카테고리 목록</p>
          <div className='div__div--category-list-data-box'>
            {/* 카테고리 목록 데이터 */}

            {bigCategory.map((item) => {
              return (
                <>
                  <div
                    id={item['_id']}
                    key={item['_id']}
                    className='div__div--category-list-data'
                    onClick={setInputValue}
                  >
                    <div className='div__div--blank'></div>
                    <p
                      id={item['_id']}
                      className='div__p--category-big-name-data'
                    >
                      {item['name']}
                    </p>
                    <button
                      type='submit'
                      className='div__button--delete-button'
                      onClick={deleteData}
                    >
                      삭제
                    </button>
                  </div>
                  <ChildCategory parentCategoryId={item['_id']} />
                </>
              );
            })}
          </div>
        </div>

        {/* 카테고리 등록/수정 */}
        <div className='div__div--category-info'>
          <form className='div__form--category-form'>
            <div className='form__div--category-info-gap'>
              {/* 카테고리 명 */}

              <label className='form_label--category-label'>카테고리 명</label>
              <input
                required
                type='text'
                className='form__div--category-name'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className='form__div--category-info-gap'>
              <label className='form_label--category-label'>
                카테고리 분류
              </label>
              <select
                required
                value={categoryType}
                className='form__div--category-select'
                onChange={(e) => {
                  setCategoryType(e.target.value);
                }}
              >
                <option value='default'>분류를 선택해주세요.</option>
                <option key='대분류' value='대분류'>
                  대분류
                </option>
                <option key='소분류' value='소분류'>
                  소분류
                </option>
              </select>
            </div>
            <div className='form__div--category-info-gap'>
              {/* 소분류 선택시 대분류 목록 불러오기 */}

              {categoryType === '소분류' ? (
                <>
                  <label className='form__label--category-label'>
                    상위 카테고리
                  </label>
                  <select
                    className='form__div--category-main-div'
                    onChange={(e) => {
                      setParentCategory(e.target.value);
                    }}
                    value={parentCategory}
                  >
                    <option value='default'>대분류를 선택해 주세요</option>

                    {bigCategory.map((item) => {
                      return (
                        <option value={item['_id']}>{item['name']}</option>
                      );
                    })}
                  </select>
                </>
              ) : (
                // 대분류 선택시 아무것도 가져오지 않음
                <div></div>
              )}
            </div>
            <button
              type='submit'
              className='form__button--category-button'
              onClick={editMode ? updateData : createNewData}
            >
              {editMode ? '수정' : '등록'}
            </button>
          </form>
          <button
            className='button__category-button-cancle'
            onClick={cancleBtn}
          >
            {editMode ? '수정 취소' : '등록 취소'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
