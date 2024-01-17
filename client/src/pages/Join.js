import { useEffect, useState } from 'react';
import { getUser, postUser } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';

function Join() {
  // 데이터 변수
  const [userName, setUserName] = useState('');
  const [userFirstPassword, setUserFirstPassword] = useState('');
  const [userLastPassword, setUserLastPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // 가입하기 버튼 클릭시 실행되는 함수
  const joinButtonClick = () => {
    if (
      emailCheck(userEmail) &&
      passwordCheck(userFirstPassword) &&
      passwordDoubleCheck(userFirstPassword, userLastPassword)
    ) {
      createNewUser();
      setUserName('');
      setUserFirstPassword('');
      setUserLastPassword('');
      setUserEmail('');
    }
  };

  // 회원가입 post
  const createNewUser = async () => {
    const newUser = {
      name: userName,
      password: userLastPassword,
      email: userEmail,
    };
    const result = await postUser(newUser);
    if (!result) {
      alert('회원가입에 실패했습니다.');
    } else if (result === 'EXIST') {
      alert('이미 존재하는 아이디 입니다. 다른 아이디를 사용해주세요.');
    } else {
      alert('회원가입 성공^ㅁ^');
      navigate('/auth/login');
    }
  };

  // 이메일 & 패스워드 정규식 표현
  const emailRegEx =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  // 이메일 형식 체크
  const emailCheck = (userEmail) => {
    if (emailRegEx.test(userEmail)) {
      return true;
    } else {
      alert('이메일 형식이 아닙니다. 다시 입력해주세요.');
      return false;
    }
  };

  // 비밀번호 형식 체크
  const passwordCheck = (password) => {
    if (userFirstPassword.match(passwordRegEx) === null) {
      alert('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      return false;
    } else {
      return true;
    }
  };

  // 패스워드 일치 확인
  const passwordDoubleCheck = (userFirstPassword, userLastPassword) => {
    if (userFirstPassword !== userLastPassword) {
      alert('비밀번호가 다릅니다.');
      return false;
    } else {
      return true;
    }
  };

  // 이메일 중복 확인
  // const checkEmailValid

  return (
    <div className='body__div--login-content'>
      <h3 className='body__h3--login-logo'>SINBA_D</h3>
      <form>
        {/* 이메일 작성 */}
        <label htmlFor='email' className='form__label--text-hidden'>
          이메일
        </label>
        <input
          type='email'
          className='form__input--signup-id'
          placeholder='이메일 형식으로 입력해주세요.'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <br />
        {/* 비밀번호 작성 */}
        <label htmlFor='password' className='form__label--text-hidden'>
          비밀번호
        </label>
        <input
          type='password'
          className='form__input--signup-password'
          placeholder='비밀번호는 영문자+숫자+특수문자 포함 8자 이상 입력해주세요.'
          value={userFirstPassword}
          onChange={(e) => setUserFirstPassword(e.target.value)}
          required
        />
        <br />
        {/* 비밀번호 재입력 */}
        <label htmlFor='confirm-password' className='form__label--text-hidden'>
          비밀번호
        </label>
        <input
          type='password'
          className='form__input--signup-confirm-password'
          placeholder='비밀번호를 다시 입력해주세요.'
          onChange={(e) => setUserLastPassword(e.target.value)}
          required
        />
        <br />
        {/* 이름 작성 */}
        <label htmlFor='name' className='form__label--text-hidden'>
          이름
        </label>
        <input
          type='text'
          className='form__input--signup-name'
          placeholder='이름을 입력해주세요.'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <input
          type='button'
          className='form__input--signup-completed-button'
          value='가입하기'
          onClick={joinButtonClick}
        />
      </form>
    </div>
  );
}

export default Join;
