import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import logoImgage from '../../image/logo.png';

import { logout } from '../../api/authAPI';
import { getBigCategory } from '../../api/categoryAPI';
import { isTokenEixst, removeCookie, getCookie } from '../../utils/cookieUtils';

const Header = () => {
  const navigate = useNavigate();
  // 대분류 목록 불러오기
  const [bigCategoryList, setBigCategoryList] = useState([]);
  const [isAdmin, checkAdmin] = useState(false);
  const [isLogin, setLoginStatus] = useState(false);

  useEffect(() => {
    refresh();
    if (getCookie('user_id') === 'admin') {
      checkAdmin(true);
    }
  }, []);

  const handlingLogin = () => {
    setLoginStatus(isTokenEixst('token'));
  };

  const refresh = () => {
    getBigCategory().then((response) => {
      setBigCategoryList(response);
    });
    handlingLogin();
  };

  const clickLogoutBtn = () => {
    if (window.confirm('로그아웃을 하시겠습니까?')) {
      logout();
      alert('로그아웃 되었습니다.');

      setLoginStatus(false);
      removeCookie('user_id');
      navigate('/');
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <header className='body__header'>
      <div className='header__div--header-wrap'>
        <h1 className='header__h1--logo'>
          <Link to='/'>
            <img src={logoImgage} alt='logo' />
          </Link>
        </h1>
        <nav className='header__nav'>
          <ul className='nav__ul--gnb'>
            <li className='nav__ul--gnb-list'>
              <Link to='/plist/all'>SHOES</Link>
            </li>
            <li className='nav__ul--gnb-list'>
              <Link to='/plist/man?category_id=654d9b796935839734182b33&page=1'>
                MAN
              </Link>
            </li>
            <li className='nav__ul--gnb-list'>
              <Link to='/plist/woman?category_id=654d9b7e6935839734182b3c&page=1'>
                WOMAN
              </Link>
            </li>
          </ul>
        </nav>
        <div className='header__div--icon'>
          {isLogin ? (
            <>
              {isAdmin ? (
                <button>
                  <Link to='/manageproducts'>
                    <FontAwesomeIcon
                      icon={faUser}
                      className='div__button--user-button'
                    />
                  </Link>
                </button>
              ) : (
                <>
                  <button>
                    <Link to='/user/order'>
                      <FontAwesomeIcon
                        icon={faUser}
                        className='div__button--user-button'
                      />
                    </Link>
                  </button>
                  <button>
                    <Link to='/cart'>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className='div__button--cart-button'
                      />
                    </Link>
                  </button>
                </>
              )}
              <button onClick={clickLogoutBtn}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className='div__button--logout-button'
                />
              </button>
            </>
          ) : (
            <>
              <button>
                <Link to='/auth/login'>
                  <FontAwesomeIcon
                    icon={faUser}
                    className='div__button--user-button'
                  />
                </Link>
              </button>
              <button>
                <Link to='/'>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className='div__button--cart-button'
                  />
                </Link>
              </button>
              <div></div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
