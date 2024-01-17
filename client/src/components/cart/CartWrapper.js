import CartList from './CartList';
import Purchase from './Purchase';

const CartWrapper = ({
  handleSingleChecked,
  isPurchase,
  handlePurchase,
  totalPrice,
  handleDeleteItem,
  savedItem,
  setSavedItem,
  selectedItems,
  setSelectedItems,
  totalPaymentAmount,
  deliveryFee,
}) => {
  return (
    <div className='body__div--cart-div-content-flex'>
      <CartList
        handleSingleChecked={handleSingleChecked}
        savedItem={savedItem}
        selectedItems={selectedItems}
        setSavedItem={setSavedItem}
        handleDeleteItem={handleDeleteItem}
      />
      <Purchase
        savedItem={savedItem}
        totalPrice={totalPrice}
        totalPaymentAmount={totalPaymentAmount}
        deliveryFee={deliveryFee}
        selectedItems={selectedItems}
        setSavedItem={setSavedItem}
        setSelectedItems={setSelectedItems}
        handlePurchase={handlePurchase}
        isPurchase={isPurchase}
      />
    </div>
  );
};

export default CartWrapper;
