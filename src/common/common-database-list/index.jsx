import React, { useState, useEffect, useContext } from "react";
import "react-calendar/dist/Calendar.css";
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from "../../assets/images/banner.png";
import { useUpdateUserNameMutation } from "../../api/user";
import FilterMenu from "./FilterMenu";
import { Spin, Collapse } from "antd";
import CommonPagination from "../../common/pagination/CommonPagination";
import {
  languageFilter,
  skinColors,
  hairColors,
  eyeColors,
  extraTalent,
  genderFilter,
  languageOptions,
  experienceFilter,
  ageFilter,
  bestInOptions,
  availableOptions,
} from "../../constant/common";

import { FiltersContext } from "../../App";
const { Panel } = Collapse;

const CommonDataBaseList = ({ allUsers, isFav, loading }) => {
  const [isloading, setIsloading] = useState(false);
  const { filters, formData, setFormData } = useContext(FiltersContext);
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();
  const onShowSizeChange = (page, limit) => {
    const payload = {
      ...formData,
      page: page,
      // limit: limit
    };
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) delete formData[key];
    });
    userNameMutation(payload);
  };

  useEffect(() => {
    const payload = formData;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) delete formData[key];
    });
    userNameMutation(payload);
  }, [formData]);

  const renderLeftSideFilter = () => {
    return (
      <>
        <Collapse defaultActiveKey={[""]}>
          <Panel header="Experience" key="1">
            <SubCategoryComponent
              title="Experience"
              name="experience"
              options={experienceFilter}
              formData={formData}
              setFormData={setFormData}
            />
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={[""]}>
          <Panel header="Age" key="2">
            <SubCategoryComponent
              title="Age"
              name="age"
              options={ageFilter}
              formData={formData}
              setFormData={setFormData}
            />
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={[""]}>
          <Panel header="Gender" key="3">
            <SubCategoryComponent
              title="Gender"
              name="gender"
              options={genderFilter}
              formData={formData}
              setFormData={setFormData}
            />
          </Panel>
        </Collapse>
      </>
    );
  };

  const renderFilterComponent = (key) => {
    switch (key) {
      case "available":
        return (
          <SubCategoryComponent
            title="Available"
            name="available"
            value={formData?.available}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, available: val.value });
            }}
            onClear={() => setFormData({ ...formData, available: "" })}
            options={availableOptions}
          />
        );
      case "experience":
        return (
          <SubCategoryComponent
            title="Experience"
            name="experience"
            options={experienceFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "location":
        return (
          <SubCategoryComponent
            title="Location"
            name="location"
            options={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "gender":
        return (
          <SubCategoryComponent
            title="Gender"
            name="gender"
            options={genderFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "age":
        return (
          <SubCategoryComponent
            title="Age"
            name="age"
            options={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "weight":
        return (
          <SubCategoryComponent
            title="Weight"
            name="weight"
            options={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "height":
        return (
          <SubCategoryComponent
            title="Height"
            name="height"
            options={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "budget":
        return (
          <SubCategoryComponent
            title="Budget"
            name="budget"
            options={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "language":
        return (
          <SubCategoryComponent
            title="Language"
            name="languages"
            options={languageFilter}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case "best-in":
        return (
          <SubCategoryComponent
            title="Best In"
            name="bestIn"
            value={formData?.bestIn}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, bestIn: val.value });
            }}
            onClear={() => setFormData({ ...formData, bestIn: "" })}
            options={bestInOptions}
          />
        );
      case "extra-talent":
        return (
          <SubCategoryComponent
            title="Extra Talent"
            name="extraTalent"
            value={formData?.extraTalent}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, extraTalent: val.value });
            }}
            onClear={() => setFormData({ ...formData, extraTalent: "" })}
            options={extraTalent}
          />
        );
      case "eye-color":
        return (
          <SubCategoryComponent
            title="Eye Color"
            name="eyeColor"
            value={formData?.eyeColor}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, eyeColor: val.value });
            }}
            onClear={() => setFormData({ ...formData, eyeColor: "" })}
            options={eyeColors}
          />
        );
      case "hair-color":
        return (
          <SubCategoryComponent
            title="Hair Color"
            name="hairColor"
            value={formData?.hairColor}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, hairColor: val.value });
            }}
            onClear={() => setFormData({ ...formData, hairColor: "" })}
            options={hairColors}
          />
        );
      case "skin-tone":
        return (
          <SubCategoryComponent
            title="Skin Tone"
            name="skinTone"
            value={formData?.skinTone}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, skinTone: val.value });
            }}
            onClear={() => setFormData({ ...formData, skinTone: "" })}
            options={skinColors}
          />
        );
      default:
        return null;
    }
  };

  const renderConditionFilter = () => {
    return filters?.length
      ? filters.map((item, idx) => {
          return (
            <>
              <Collapse defaultActiveKey={[""]}>
                <Panel header={item.value} key={idx}>
                  {renderFilterComponent(item.key)}
                </Panel>
              </Collapse>
            </>
          );
        })
      : renderLeftSideFilter();
  };

  return (
    <div className="list-con">
      <div className="left-side-bar">{renderConditionFilter()}</div>

      <div className="database-right-side-section">
        <FilterMenu
          renderLeftSideFilter={renderConditionFilter}
          setIsloading={setIsloading}
        />
        <div className="database-container">
          <CommonList
            users={allUsers?.users || allUsers}
            isFav={isFav}
            isLoading={isLoading || loading || isloading}
          />
          {/*<InfiniteScrollCard formData={formData} userNameMutation={userNameMutation} />*/}
        </div>

        <div className="banner-container">
          <img src={banner} alt="ad" width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default CommonDataBaseList;
