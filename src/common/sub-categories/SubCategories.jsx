import React, { useEffect, useState } from "react";
import { Typography, Checkbox, Input, Row, Col, Divider } from "antd";
import FormSelect from "../inputs/FormSelect";
import './subCategoriesStyle.less';
import GroupCheckbox from "../group-checkbox/GroupCheckbox";
import { useStateQuery } from "../../api/getStatesQuery";
import { mapCities, mapStates } from "../../common/utils";

const SubCategoryComponent = ({
  subCategoryFilter,
  formData,
  setFormData,
  title,
  name,
  onSelect,
  onClear,
  options,
  value
}) => {

  const { data } = useStateQuery();
  const [location, setLocation] = useState(undefined);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);

  useEffect(() => {
		const states = mapStates(data);
		setLocation(states);
	},[data])

	useEffect(() => {
		if(selectedState) {
			const cities = mapCities(data, selectedState)
			setCities(cities);
		}
	},[selectedState])



  const locationFun = () => {
    return (
      <div className="location-filter">
        <FormSelect
          className="state-search-input"
          name="state"
          allowClear={true}
          placeholder="Select State"
            value={formData?.state}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setSelectedState(val.value)
              setFormData({...formData, state: val.value, city: ''})
            }}
            onClear={() => setFormData({...formData, state: '', city: ''})}
            options={location && Object.keys(location).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select City"
            className="city-search-input"
						value={formData.city}
            onSelect={(cat, val) => {
              setFormData({...formData, city: val.value})
            }}
						options={cities}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						// validationError={formDataErrors.city}
						width={"100%"}
					/>
      </div>
    );
  };

  const dropdownSingleFun = () => {
    return (
      <div className="location-filter">
        <FormSelect
          className="state-search-input"
          name={name}
          allowClear={true}
          placeholder="Select"
          value={value}
          onSelect={onSelect}
          onClear={onClear}
          options={options}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
      </div>
    );
  };

  const experienceFun = () => {
      return (
        <div className="location-filter experience-filter">
          <FormSelect
            className="state-search-input"
            name="state"
            allowClear={true}
            placeholder="Select Minimum"
              value={formData?.experienceMinimum}
              onSelect={(cat, val) => {
                setFormData({...formData, experienceMinimum: val.value, experienceMaximum: val.value})
              }}
              onClear={() => setFormData({...formData, experienceMinimum: '', experienceMaximum: ''})}
              options={subCategoryFilter && Object.keys(subCategoryFilter).map((item, idx) => {
                return {
                  id: idx,
                  value: item
                }
              })}
            showSearch
            required
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
            // validationError={formDataErrors.states}
            width="100%"
          />
          <FormSelect
              name="cities"
              placeholder="Select Maximum"
              className="city-search-input"
              value={formData?.experienceMaximum}
              showFilterValue={formData?.experienceMinimum}
              onSelect={(cat, val) => {
                setFormData({...formData, experienceMaximum: val.value})
              }}
              options={subCategoryFilter && Object.keys(subCategoryFilter).map((item, idx) => {
                return {
                  id: idx,
                  value: item
                }
              })}
              showSearch
              required
              filterOption={(input, option) => option.children.indexOf(input) >= 0 }
              // validationError={formDataErrors.city}
              width={"100%"}
              disabled={formData?.experienceMinimum ? false : true}
            />
        </div>
      );
    };
  const ageFun = () => {
    return (
      <div className="location-filter experience-filter">
        <FormSelect
          className="state-search-input"
          name="state"
          allowClear={true}
          placeholder="Select Minimum"
            value={formData?.ageMinimum}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, ageMinimum: val.value, ageMaximum: val.value})
            }}
            onClear={() => setFormData({...formData, ageMinimum: '', ageMaximum: ''})}
            options={subCategoryFilter && Object.keys(subCategoryFilter).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.indexOf(input) >= 0
          }
          // validationError={formDataErrors.states}
          width="100%"
        />
        <FormSelect
            name="cities"
            placeholder="Select Maximum"
            className="city-search-input"
						value={formData?.ageMaximum}
            showFilterValue={formData?.ageMinimum}
            onSelect={(cat, val) => {
              setFormData({...formData, ageMaximum: val.value})
            }}
						options={subCategoryFilter && Object.keys(subCategoryFilter).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
            filterOption={(input, option) =>
              option.children.indexOf(input) >= 0
            }
						showSearch
						required
						// validationError={formDataErrors.city}
						width={"100%"}
            disabled={formData?.ageMinimum ? false : true}
					/>
      </div>
    );
  };


  const checkboxFun = (title) => {
    return (
      <GroupCheckbox
        options={subCategoryFilter}
        onChange={(e) => {
            setFormData({
              ...formData,
              [name]: e
            })
        }}
      />
    );
  };

  const renderFilter = () => {
    switch (title) {
      case "Location":
        return locationFun();
      case "Experience" : 
        return experienceFun()
      case "Age" : 
        return ageFun()
      case "Best In" : return dropdownSingleFun()
      default:
        return checkboxFun(title);
    }
  };

  return (
    <div className="sub-categories-container">
    {/*  <div className="title">
      <Typography.Title level={3} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
          {title}
  </Typography.Title
      </div>> */}
      <Divider orientation="left">{title}</Divider>
      <div className="filter-container">{renderFilter()}</div>
    </div>
  );
};

export default SubCategoryComponent;
