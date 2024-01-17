import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className='body__footer'>
      <div className='footer__div--wrap'>
        <div className='div__div--text'>
          <div>
            © 2023 Elice SW 7, 9 team In morning Inc. All Rights Reserved
          </div>
          <div>
            <ul className='div__ul--footer-info'>
              <li>
                <Link to='/' className='li__a--footer-info-list'>
                  이용약관
                </Link>
              </li>
              <li>
                <Link to='/' className='li__a--footer-info-list'>
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link to='/' className='li__a--footer-info-list'>
                  위치 기반 서비스 약관
                </Link>
              </li>
              <li>
                <Link to='/' className='li__a--footer-info-list'>
                  영상정보처리기기 운영 방침
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className='div__hr--footer-hr' />
        <div>
          상호명 : (주)아침엔 | 대표자명 : 김진주 | 사업자등록번호 :
          123-45-67890 | 사업장 주소 : 서울 엘리스 성수랩 | 대표전화 : 1234-5678{' '}
          <br />
          특정 브랜드의 상품에 있어 폴더는 통신판매중개자이며, 통신판매의
          당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은
          판매자에게 있습니다.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
