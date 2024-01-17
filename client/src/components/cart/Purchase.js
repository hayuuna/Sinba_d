const Purchase = ({
  isPurchase,
  handlePurchase,
  savedItem,
  totalPrice,
  totalPaymentAmount,
  deliveryFee,
  selectedItems,
}) => {
  return (
    <div>
      <form className='div__form--order-sheet-style'>
        <div className='div__p--product-amount-flex'>
          <p className='div__p--product-amount-text'>상품 금액</p>

          <p className='div__p--product-amount'>{`${totalPrice}원`}</p>
        </div>
        <div className='div__p--delivery-fee-text-flex'>
          <p className='div__p--delivery-fee-text'>배송비</p>
          <p className='div__p--delivery-fee'>
            {selectedItems.length > 0 ? `${deliveryFee}원` : `0원`}
          </p>
        </div>
        <div className='div__p--total-payment-amount-flex'>
          <p className='div__p--total-payment-amount-text'>총 결제 금액</p>
          <p className='div__p--total-payment-amount'>
            {`${totalPaymentAmount}원`}
          </p>
        </div>
      </form>
      <button
        disabled={!isPurchase || selectedItems.length === 0}
        style={{
          opacity: isPurchase ? 1 : 0.5,
        }}
        className='button__purchaseBtn'
        onClick={handlePurchase}
      >
        구매하기
      </button>
    </div>
  );
};

export default Purchase;
