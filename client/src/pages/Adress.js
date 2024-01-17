import { updateAddress } from '../api/addressAPI';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [orderId, setOrderId] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  // 주소
  const [address, setAddress] = useState('');
  // 상세 주소
  const [addressDetail, setaddressDetail] = useState('');

  const handleSubmit = (e) => {
    updateAddress({ id: orderId, address, addressDetail });
    alert('주소 수정 완료!');
    navigate('/user/order');
  };

  useEffect(() => {
    setAddress(searchParams.get('address'));
    setaddressDetail(searchParams.get('detail'));
    setOrderId(params.id);
  }, []);

  return (
    <div>
      <div className='body__div--delivery-address-div-size'>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor='fname'
            className='form__label--delivery-address-title'
          >
            배송지 입력
          </label>
          <br />
          <input
            type='text'
            required
            className='form__label--delivery-address'
            placeholder='주소를 입력해주세요.'
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <br />
          <input
            type='text'
            required
            className='form__label--delivery-address-detail'
            placeholder='상세 주소를 입력해주세요.'
            value={addressDetail}
            onChange={(e) => {
              setaddressDetail(e.target.value);
            }}
          />
          <button className='div__button--purchase-completed-button-style'>
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
