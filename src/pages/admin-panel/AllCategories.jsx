import React, { useEffect, useState } from "react";
import { Input, Modal, Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import {
  createCategoryApi,
  deleteCategoryApi,
  updateCategoryApi,
  updateSubCategoryApi,
  updateTagsApi,
} from "../../api/getCategories";
import PopConfirm from "../../common/pop-confirm";

const renderMethod = (payload, title, id) => {
  if (title === "category") return createCategoryApi(payload);
  if (title === "Sub-category") return updateSubCategoryApi(id, payload);
  if (title === "tags") return updateTagsApi(id, payload);
};
const AllCategories = ({ categories, col, getCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [catId, setCatId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditOptions, setIsEditOptions] = useState(false);

  const fetchCategoriesList = () => {
    const updateSelectedCategory = categories?.filter(
      (item) => item?._id == selectedCategory?._id
    );
    setSelectedCategory(
      updateSelectedCategory?.length
        ? updateSelectedCategory[0]
        : selectedCategory
    );
  };

  const handleAdd = (type, id) => {
    setTitle(type);
    setIsVisible(true);
    setIsEdit(false);
    setIsEditOptions(false);
  };

  const fetchRenderMethodData = async (payload, title, selectedCategoryId) => {
    const res = await renderMethod(payload, title, selectedCategoryId);
    if (res) {
      getCategories();
      setTitle("");
    }
  };

  console.log(selectedCategory, "selectedCategory");

  const updateCategoryListApi = async (payload) => {
    const res = await updateCategoryApi(formData._id, payload);
    if (res) {
      getCategories();
    }
  };

  const handleSave = () => {
    let payload = {};
    if (title === "category") {
      payload = {
        value: formData["category"],
      };
    }
    if (title === "Sub-category") {
      if (isEditOptions) {
        payload = selectedCategory?.childern?.map((item) =>
          item.key === formData.key
            ? { ...item, value: formData[title] }
            : { ...item }
        );
      } else {
        payload = [
          ...selectedCategory?.childern,
          {
            key: formData["Sub-category"].toLowerCase().replace(" ", "-"),
            _id: new Date().valueOf(),
            value: formData[title],
          },
        ];
      }
    }

    if (title === "tags") {
      if (isEditOptions) {
        payload = selectedCategory.tags.map((item) =>
          item.key === formData.key
            ? { ...item, value: formData[title] }
            : { ...item }
        );
      } else {
        payload = [
          ...selectedCategory.tags,
          {
            key: formData["tags"].toLowerCase().replace(" ", "-"),
            _id: new Date().valueOf(),
            value: formData[title],
          },
        ];
      }
    }

    isEdit
      ? updateCategoryListApi(payload)
      : fetchRenderMethodData(payload, title, selectedCategory._id);
    setIsVisible(false);
    setFormData({});
    getCategories();
  };

  const handleEdit = (entity, type) => {
    if (type == "category") {
      setFormData({ ...entity, category: entity.value });
      setTitle(type);
      // setIsVisible(true);
      setIsEditOptions(false);
      setIsEdit(true);
    }
    if (type == "Sub-category" || type == "tags") {
      setFormData({ ...entity, [type]: entity.value });
      setTitle(type);
      setIsEditOptions(true);
      // setIsVisible(true);
      setIsEdit(false);
    }
    // setFormData({...entity, 'category': entity.value})
    setTitle(type);
    setIsVisible(true);
    // setIsEdit(true);
    // const payload = {
    //   value: formData[title]
    // }
  };

  const fetchCategories = () => {
    getCategories();
    fetchCategoriesList();
    setTitle("");
  };

  const handleDelete = async (id, type) => {
    if (type == "category") {
      const res = await deleteCategoryApi(id);
      if (res) {
        fetchCategories();
      }
    }
    if (type == "Sub-category") {
      const updateSubCategory = selectedCategory?.childern?.filter(
        (item) => item?._id != id
      );
      const res = await updateSubCategoryApi(
        selectedCategory._id,
        updateSubCategory
      );
      if (res) {
        fetchCategories();
      }
    }
    if (type == "tags") {
      const updateTags = selectedCategory?.tags?.filter(
        (item) => item?._id != id
      );
      const res = await updateTagsApi(selectedCategory._id, updateTags);
      if (res) {
        fetchCategories();
      }
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setFormData({});
    setTitle("");
  };

  useEffect(() => {
    fetchCategoriesList();
  }, [categories]);

  return (
    <div className="all-categories">
      <div className="category-container">
        <div className="title">
          <div>Categories</div>
          <FileAddOutlined onClick={() => handleAdd("category")} />
        </div>

        {categories
          .sort((a, b) => a.value.localeCompare(b.value))
          .map((category, idx) => (
            <div className="single-category">
              <div className="name-container">
                <div className="serial-number">{idx + 1}.</div>
                <div
                  className="cat-name"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.value}
                </div>
              </div>
              <div className="action">
                <EditOutlined
                  onClick={() => handleEdit(category, "category")}
                />
                <PopConfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    handleDelete(category._id, "category");
                  }}
                  body={<DeleteOutlined />}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="sub-category-container">
        <div className="title">
          <div>Sub Categories</div>
          <FileAddOutlined onClick={() => handleAdd("Sub-category")} />
        </div>
        {categories
          .find((cat) => cat._id === selectedCategory._id)
          ?.childern?.map((subCat, idx) => (
            <div className="single-sub-cat">
              <div className="name-container">
                <div className="serial-number">{idx + 1}.</div>
                <div className="cat-name" onClick={() => null}>
                  {subCat.value}
                </div>
              </div>
              <div className="action">
                <EditOutlined
                  onClick={() => handleEdit(subCat, "Sub-category")}
                />
                <PopConfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    handleDelete(subCat._id, "Sub-category");
                  }}
                  body={<DeleteOutlined />}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="tags-container">
        <div className="title">
          <div>Tags</div>
          <FileAddOutlined onClick={() => handleAdd("tags")} />
        </div>
        {categories
          .find((cat) => cat._id === selectedCategory._id)
          ?.tags?.map((tag, idx) => (
            <div className="single-tag">
              <div className="name-container">
                <div className="serial-number">{idx + 1}.</div>
                <div className="cat-name" onClick={() => null}>
                  {tag.value}
                </div>
              </div>
              <div className="action">
                <EditOutlined onClick={() => handleEdit(tag, "tags")} />
                <PopConfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    handleDelete(tag._id, "tags");
                  }}
                  body={<DeleteOutlined />}
                />
              </div>
            </div>
          ))}
      </div>
      <AddCatContentModal
        isVisible={isVisible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setFormData={setFormData}
        formData={formData}
        field={title}
        title={isEdit ? `Edit ${title}` : `Add ${title}`}
      />
    </div>
  );
};

export default AllCategories;

export const AddCatContentModal = (props) => {
  const {
    isVisible,
    handleSave,
    handleCancel,
    setFormData,
    formData,
    field,
    title,
  } = props;

  return (
    <Modal
      visible={isVisible}
      onOk={handleSave}
      onCancel={handleCancel}
      title={title}
    >
      <Form.Item label={field}>
        <Input
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
          value={formData[field]}
          name={field}
        />
      </Form.Item>
    </Modal>
  );
};
