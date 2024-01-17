import React, { memo } from 'react';
import baseProductImgage from '../image/base_product_image.png';
// import logoImgage from '../../image/logo.png';
const ManageProduct = ({ products, handleEdit, handleRemove, brands }) => {
  const getBrandName = (brandId) => {
    const data = brands.filter((brand) => brand._id === brandId);
    return data[0].name;
  };

  return (
    <table className='div__product-info-list'>
      <thead className='table__thead--table-content'>
        <tr>
          <th>상품 이미지</th>
          <th>상품명</th>
          <th>사이즈</th>
          <th>상품 수정</th>
          <th>상품 삭제</th>
        </tr>
      </thead>
      <tbody className='table__tbody--table-content'>
        {products.map((item) => {
          const imgSrc =
            item.main_images.length && item.main_images[0]
              ? item.main_images[0].url
              : baseProductImgage;
          return (
            <tr key={item['_id']}>
              <td>
                <img className='image' src={imgSrc} width='100px' />
              </td>
              <td className='div__span--item-title'>{item.title}</td>
              <td className='div__span--item-price'>{item.price}</td>
              <td>
                <button
                  onClick={() => {
                    const product = item;
                    handleEdit(product);
                  }}
                >
                  수정하기
                </button>
              </td>
              <td>
                <button onClick={() => handleRemove(item)}>삭제하기</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(ManageProduct);
