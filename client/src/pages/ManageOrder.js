import { useEffect, useState } from 'react';
import { getUserOrderList } from '../api/userOrderAPI';

const ManageOrder = () => {
  return (
    <div className='body__div--manage-order-content'>
      <h3 className='body__h3--manage-order-logo'>주문 관리</h3>
      <table className='div__table--manage-order-content'>
        <thead className='table__thead--manege-order-title'>
          <tr>
            <th>상품이미지</th>
            <th>주문 일자</th>
            <th>가격</th>
            <th>배송 상태 변경</th>
            <th>주문 취소</th>
          </tr>
        </thead>
        <tbody className='table__tbody--manege-order-content'>
          <tr>
            <td className='div__orderList--manege-order-image'>
              이미지 들어갈거임
            </td>
            <td>주문 날짜</td>
            <td>230000</td>
            <td>
              <select className='div__orderList--manege-order-column '>
                <option>상품 준비중</option>
                <option>주문 완료</option>
                <option>배송중</option>
                <option>배송 완료</option>
              </select>
            </td>
            <td>
              {' '}
              <button className='div__orderList--manege-order-column'>
                취소하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
