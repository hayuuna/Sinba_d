import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PurchaseCompleted = () => {
  const navigate = useNavigate();
  const CompleteStyle = {};

  return (
    <>
      <div className='div__completeStyle'>
        <h2>주문이 완료되었습니다</h2>
        <br />
        <div className='div__linkBtn--purchaseCompelete'>
          <button>
            <Link to='/'>메인페이지</Link>
          </button>
          <button>
            <Link to='/user/order'>주문 내역</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default PurchaseCompleted;
