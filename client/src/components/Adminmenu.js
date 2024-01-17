function Adminmenu() {
  return (
    <div className='div__div--login-user-menu'>
      <p className='div__p--login-user-title'>계정</p>
      <button className='div__button--login-user-info'>상품관리</button>
      <button className='div__button--login-user-order'>주문관리</button>
      <button className='div__button--login-user-logout'>로그아웃</button>
    </div>
  );
}

export default Adminmenu;
