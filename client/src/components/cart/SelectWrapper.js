const SelectWrapper = ({ selectDelete, isAllChecked, handleAllChecked }) => {
  return (
    <div className="div__div--select-display">
      <label className="checkbox-container" for="checkbox-all">
        <input
          type="checkbox"
          className="cart-checkbox"
          id="checkbox-all"
          checked={isAllChecked}
          onChange={handleAllChecked}
        />
        <span className="checkmark">
          <i className="fa-solid fa-check"></i>
        </span>
      </label>
      <p className="div__p--select-all-text">전체선택</p>
      <button
        className="div__button--select-delete-button"
        onClick={selectDelete}
      >
        선택삭제
      </button>
    </div>
  );
};

export default SelectWrapper;
