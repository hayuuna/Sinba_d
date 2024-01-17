const CheckBox = ({
  category,
  handleCheckboxChange,
  selectedCategories,
  type,
}) => {
  return (
    <div>
      <span className='div__span--big-category'>{type}</span>
      {category.map((item) => (
        <div key={item._id} className='span__div--item-box'>
          <label className='div__label--small-category'>
            {' '}
            <input
              type='checkbox'
              value={item._id}
              onChange={handleCheckboxChange}
              checked={selectedCategories.includes(item._id)}
              className='div__label--small-category-check'
            />
            {item.name}
          </label>
          <br />
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
