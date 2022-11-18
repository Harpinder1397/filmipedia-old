import React from "react";
import { Typography, Checkbox, Input } from "antd";
import FormSelect from "../inputs/FormSelect";
import './subCategoriesStyle.less';

const SubCategoryComponent = ({
  subCategoryFilter,
  formData,
  setFormData,
  title,
}) => {

  const locationFun = () => {
    return (
      <div className="location-filter">
        <FormSelect
          className="state-search-input"
          name="state"
          allowClear={true}
          placeholder="Select State"
          //   value={searchQuery?.state}
          //   onSelect={(cat, val) => {
          //     setSearchQuery({...searchQuery, state: val.value})
          //   }}
          //   onClear={() => setSearchQuery({})}
          //   options={stateList}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width={"100%"}
        />
        <Input
          name="name"
          allowClear={true}
          placeholder="Search City"
          className="city-search-input"
          //   value={searchQuery?.name}
          //   onChange={(e) => setSearchQuery({...searchQuery, name: e.target.value})}
        />
      </div>
    );
  };

  const checkboxFun = (subCat) => {
    return (
      <Checkbox
        kye={subCat.key}
        name={subCat.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            [subCat.objName]: e.target.checked ? e.target.value : "",
          })
        }
        value={subCat.value}
        style={{ marginTop: "20px" }}
      >
        <span style={{ fontSize: "16px" }}>{subCat.name}</span>
      </Checkbox>
    );
  };

  const renderFilter = () => {
    switch (title) {
      case "Location":
        return locationFun();
      default:
        return subCategoryFilter.map((subCat) => {
          return checkboxFun(subCat);
        });
    }
  };

  return (
    <div className="sub-categories-container">
      <div className="title">
        <Typography.Title level={3} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
          {title}
        </Typography.Title>
      </div>
      <div className="filter-container">{renderFilter()}</div>
    </div>
  );
};

export default SubCategoryComponent;
