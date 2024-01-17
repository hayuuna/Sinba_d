import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../api/authAPI";

function Login() {
  const navigate = useNavigate();

  // 입력된 유저 아이디, 비밀번호
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // 이메일 형식 체크
  const emailRegEx =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const emailCheck = (userId) => {
    if (userId === "admin") {
      return true;
    }
    if (emailRegEx.test(userId)) {
      return true;
    } else {
      alert("이메일 형식이 아닙니다. 다시 입력해주세요.");
      return false;
    }
  };

  // 유저 정보 Id(email) get
  const signIn = async () => {
    if (emailCheck(userId)) {
      getUser({ email: userId, password: userPassword }).then((data) => {
        if (data === "no user") {
          alert("존재하지 않는 아이디입니다. 회원가입을 해주세요.");
          return;
        } else if (data === "INCORRECT") {
          alert("비밀번호를 확인해주세요");
          return;
        }

        alert("로그인에 성공하였습니다.");
        navigate("/");
      });
    }
  };

  return (
    <div className="body__div--login-content">
      <h3 className="body__h3--login-logo">SINBA_D</h3>
      <form>
        <label htmlFor="username" className="form__label--text-hidden">
          이메일
        </label>
        <input
          type="email"
          className="form__input--login-id"
          placeholder="이메일"
          required
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <label htmlFor="password" className="form__label--text-hidden">
          비밀번호
        </label>
        <input
          type="password"
          className="form__input--login-password"
          placeholder="비밀번호"
          required
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <input
          type="button"
          className="form__input--login-button"
          value="로그인"
          onClick={signIn}
        />
        <Link to="/auth/join">
          <button type="button" className="form__input--sign-up-button">
            회원가입
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
