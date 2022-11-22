import React, { useEffect, useState } from "react";
import { Typography, Checkbox, Input, Row, Col } from "antd";
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
  name
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
              setFormData({...formData, state: val.value})
            }}
            onClear={() => setFormData({...formData, state: ''})}
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
						label="Select your city"
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

  const checkboxFun = () => {
    return (
      <GroupCheckbox
        options={subCategoryFilter}
        onChange={(e) => {
          console.log(e, 'val')
          setFormData({
          ...formData,
          [name]: e
        })}}
      />
    );
  };

  const renderFilter = () => {
    switch (title) {
      case "Location":
        return locationFun();
      default:
        return checkboxFun();
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
