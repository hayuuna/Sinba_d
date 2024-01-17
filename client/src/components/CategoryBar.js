import { useState, useEffect, memo, useCallback } from 'react';
import { getChildCategory, getBigCategory } from '../api/categoryAPI';
import Checkbox from './CheckBox';

const CategoryBar = ({
  selectedCategories,
  setSelectedCategories,
  handleCheckboxChange,
  listType,
}) => {
  const [parentCategory, setParentCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  async function getParentCategories() {
    const responseArr = await getBigCategory();
    const patentCategoryArr = responseArr.map((cate) => ({
      id: cate._id,
      name: cate.name,
    }));

    setParentCategory(patentCategoryArr);
  }

  useEffect(() => {
    getParentCategories();
  }, []);

  const getChildCategories = useCallback(
    async (parentCategory) => {
      const subCategoryWithParent = await parentCategory.map(
        (eachParentCategory) =>
          getChildCategory(eachParentCategory.id).then((data) => ({
            type: eachParentCategory.name,
            data,
          }))
      );
      const res = await Promise.all(subCategoryWithParent);
      setSubCategory(...subCategory, res);

      const womanId = parentCategory
        .filter((parentCategory) => parentCategory.name === 'WOMAN')
        .map((parentCategory) => parentCategory.id);
      const manId = parentCategory
        .filter((parentCategory) => parentCategory.name === 'MAN')
        .map((parentCategory) => parentCategory.id);
      if (listType === 'woman')
        setSelectedCategories(...selectedCategories, womanId);
      if (listType === 'man')
        setSelectedCategories(...selectedCategories, manId);
    },
    [parentCategory]
  );

  useEffect(() => {
    getChildCategories(parentCategory);
  }, [getChildCategories]);

  // subCategory.map((item) => console.log(item.data));

  const getSpecificCateory = (allSubCategory) => {
    if (listType === 'woman')
      return allSubCategory.filter(
        (cate) => cate.type === 'WOMAN' || cate.type === 'BRAND'
      );
    if (listType === 'man')
      return allSubCategory.filter(
        (cate) => cate.type === 'MAN' || cate.type === 'BRAND'
      );
    if (listType === 'all')
      return allSubCategory.filter(
        (cate) => cate.type === 'TYPE' || cate.type === 'BRAND'
      );
    else return allSubCategory;
  };

  return (
    <div className='CategoryBar'>
      {getSpecificCateory(subCategory).map((item) => (
        <Checkbox
          type={item.type}
          category={item.data}
          handleCheckboxChange={handleCheckboxChange}
          selectedCategories={selectedCategories}
        />
      ))}
    </div>
  );
};

export default memo(CategoryBar);
