import React, { useState } from 'react';

const CartList = ({
  handleSingleChecked,
  handleDeleteItem,
  savedItem,
  setSavedItem,
  selectedItems,
}) => {
  const [n, setN] = useState(1);

  // 수량 추가하기
  const handleIncreaseItem = (e) => {
    let amount = parseInt(e.target.previousSibling.value);
    const productId = e.target.parentElement.id;
    let cartProductKey = `cartProduct_${productId}`;
    let localStoragedData = JSON.parse(localStorage.getItem(cartProductKey));

    amount += 1;

    e.target.previousSibling.value = amount;
    // setN(amount);

    if (localStoragedData?.count === undefined) {
      localStoragedData = { ...localStoragedData, count: 1 };
    }

    // count 값 증가
    localStoragedData.count = amount;

    localStorage.setItem(cartProductKey, JSON.stringify(localStoragedData));

    // 상태 업데이트
    const updatedItems = savedItem.map((shoes) =>
      shoes._id === productId ? localStoragedData : shoes
    );
    setSavedItem(updatedItems);
  };

  // 수량 줄이기

  const handleDecreaseItem = (e) => {
    let amount = parseInt(e.target.nextSibling.value);
    const productId = e.target.parentElement.id;
    let cartProductKey = `cartProduct_${productId}`;
    let localStoragedData = JSON.parse(localStorage.getItem(cartProductKey));

    amount -= 1;
    e.target.nextSibling.value = amount;

    if (localStoragedData?.count === undefined) {
      localStoragedData = { ...localStoragedData, count: 1 };
    }

    if (amount < 1) {
      amount = 1;
    }

    // count 값 감소
    localStoragedData.count = amount;

    localStorage.setItem(cartProductKey, JSON.stringify(localStoragedData));

    // 상태 업데이트
    const updatedItems = savedItem.map((shoes) =>
      shoes._id === productId ? localStoragedData : shoes
    );
    setSavedItem(updatedItems);
  };

  return (
    <>
      <div className='div__div--cart-list-style'>
        {savedItem?.map((item) => (
          <div className='div__div-cart-list-all-add' key={item.id}>
            <label className='checkbox-container'>
              <input
                type='checkbox'
                className='cart-checkbox'
                checked={selectedItems.includes(item?._id)}
                onChange={() => handleSingleChecked(item?._id)}
              />
              <span className='checkmark'>
                <i className='fa-solid fa-check'></i>
              </span>
            </label>
            <div className='div__div-cart-list-add'>
              <div key={item._id} className='div__div-cart-list-add-item'>
                <img
                  src={
                    (item?.main_images &&
                      item.main_images.length > 0 &&
                      item.main_images[0].url) ||
                    'http://kdt-sw-7-team09.elicecoding.com:5000/images/e6XEhVx1pkjlD83sYaxqr.png'
                  }
                  alt={`Error`}
                />
                <div className='div__div-cart-list-add-item-brand'>
                  {item?.brand}
                  <br />
                  {item?.title}
                </div>
                <div className='div__div-cart-list-add-item-size'>
                  {item?.size}
                </div>

                <div id={item._id} className='number'>
                  <button onClick={handleDecreaseItem}>-</button>
                  <input value={item?.count ? item.count : 1} readOnly />
                  <button onClick={handleIncreaseItem}>+</button>
                </div>
                <div className='div__div-cart-list-add-item-price'>
                  {item?.price}
                </div>
                <button
                  className='div__div-cart-list-add-item-delete'
                  onClick={() => {
                    handleDeleteItem(item);
                  }}
                >
                  <i class='fa-regular fa-trash-can'></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartList;
