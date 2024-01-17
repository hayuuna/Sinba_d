import { useEffect, useState } from "react";
import {
  getChildCategory,
  deleteCategory,
  getCategoryById,
} from "../api/categoryAPI";

function ChildCategory({ parentCategoryId }) {
  const [childCatgory, setChildCategory] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [parentCategory, setParentCategory] = useState("-1");
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const refreshChild = () => {
    getChildCategory(parentCategoryId).then((response) => {
      setChildCategory(response);
    });
  };

  useEffect(() => {
    refreshChild();
  }, []);

  // 카테고리 삭제 delete
  const deleteData = async (e) => {
    const deleteId = {
      _id: e.target.parentElement.id,
    };
    await deleteCategory(deleteId);
    refreshChild();
  };

  const setInputValue = (e) => {
    setEditMode(true);

    const data = getCategoryById(e.target.id).then((res) => {
      setCategoryId(e.target.id);
      setCategoryName(res.name);
      setCategoryType(res.categoryType);
      setParentCategory(res.parentCategory);
    });
  };

  return childCatgory.map((item) => {
    return (
      <div
        id={item["_id"]}
        onClick={setInputValue}
        className="div__div--category-list-data"
      >
        <div className="div__div--blank">*ㄴ</div>
        <p id={item["_id"]} className="div__p--category-big-name-data">
          {item["name"]}
        </p>
        <button
          type="submit"
          className="div__button--delete-button"
          onClick={deleteData}
        >
          삭제
        </button>
      </div>
    );
  });
}

export default ChildCategory;
