import { useState, useEffect } from 'react';
import { deleteOrder } from '../api/userOrderAPI';
import { Link } from 'react-router-dom';

function Orders({ userOrderList, getOrderList }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(userOrderList);
  }, []);

  const clickDeleteBtn = (e) => {
    if (window.confirm('주문을 취소하시겠습니까?')) {
      deleteOrder(e.target.value);
      alert('삭제되었습니다.');
      getOrderList();
    } else {
      alert('취소되었습니다.');
    }
  };

  return orders.map((order) => {
    return (
      <div key={order['_id']} className='div__orderList--order'>
        <div className='div__orderList--order-column'>
          <div>이미지 들어갈거임</div>
        </div>
        <div className='div__orderList--order-column'>{order['date']}</div>
        <div className='div__orderList--order-column'>
          {order['total_price']}
        </div>
        <div className='div__orderList--order-column'>
          {order['delivery_state']}
        </div>
        <div className='div__orderList--order-column'>
          {order['items'].length}
        </div>
        <div className='div__orderList--order-column'>
          {order['delivery_state'] === '주문 완료' ? (
            <Link
              to={`/address/${order['_id']}?address=${order['address']}&detail=${order['addressDetail']}`}
            >
              수정하기
            </Link>
          ) : (
            '수정불가'
          )}
        </div>
        <div className='div__orderList--order-column'>
          {order['delivery_state'] === '주문 완료' ? (
            <button
              className='button__orderDelete'
              value={order['_id']}
              key={order['_id']}
              onClick={clickDeleteBtn}
            >
              취소하기
            </button>
          ) : (
            '취소불가'
          )}
        </div>
      </div>
    );
  });
}
export default Orders;
