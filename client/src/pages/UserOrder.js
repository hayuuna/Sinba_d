import { useEffect, useState } from 'react';
import { getUserOrderList, deleteOrder, getImage } from '../api/userOrderAPI';
import { getCookie } from './../utils/cookieUtils';
import { Link } from 'react-router-dom';

import '../css/userOrderCSS.css';

function UserOrder() {
  const [userOrderList, setUserOrderList] = useState([]);
  const [user_id, setUserId] = useState(getCookie('user_id'));
  const [imgSrc, setImgSrc] = useState('');

  const getOrderList = async () => {
    //TODO: 로그인 이후에 id 값 가져오기
    await getUserOrderList(user_id).then((data) => {
      setUserOrderList(data);
    });
  };

  useEffect(() => {
    getOrderList();
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

  return (
    <div className='body__div--orderList-content'>
      <div className='body__div--userBtn'>
        <Link to='/userinfo'>회원정보 수정</Link>
        <Link to='/user/order'>주문 내역</Link>
      </div>
      <h3 className='body__h3--orderList-logo'>주문 내역</h3>

      <div className='div__orderList--container'>
        <div className='div__orderList--header'>
          <div>상품 이미지</div>
          <div>주문 일자</div>
          <div>가격</div>
          <div>상태</div>
          <div>상품 총 개수</div>
          <div>주소 수정</div>
          <div>주문 취소</div>
        </div>

        <div className='div__orderList--contents'>
          {userOrderList.length < 1 ? (
            <div className='div__orderList--order'>
              <div>현재 주문한 내역이 없습니다</div>
            </div>
          ) : (
            userOrderList.map((order) => {
              return (
                <div key={order['_id']} className='div__orderList--order'>
                  <div className='div__orderList--order-column'>
                    <img
                      className='img__orderList-titleImg'
                      src={order.imgUrl}
                    />
                  </div>
                  <div className='div__orderList--order-column'>
                    {order['date']}
                  </div>
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
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
