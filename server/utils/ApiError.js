/*
    기본 에러의 문제는 메세지만 들어간다는 것
    에러 코드를 담지 않는다.
    따라서 에러 코드와 메세지를 담고 에러가 난 위치에서 발생한
    스택트레이스 정보까지 담아주는 새로운 에러클래스를 만든다.

    생성자의 첫번째 매개변수로는 status코드를 사용한다.
    이 코드는 http-status 모듈의 코드들을 이용해서 넘어온다.
    
    두번째는 기존에 사용하는 메세지!

    세번째는 
*/
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
