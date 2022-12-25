import React, { useState, useEffect, useContext } from "react";
import "react-calendar/dist/Calendar.css";
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from "../../assets/images/banner.png";
import { useUpdateUserNameMutation, useUserQuery } from "../../api/user";
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
  budgetFilter,
  bestInOptions,
  availableOptions,
} from "../../constant/common";

import { FiltersContext } from "../../App";
import { useGetCountriesMutation, useGetCountriesQuery } from "../../api/getCountries";
import { CloseCircleOutlined } from "@ant-design/icons";
import CommonScroll from "./CommonScroll";
import InfiniteScrollCard from "./InfiniteScrollCard";
const { Panel } = Collapse;

const CommonDataBaseList = ({isFav, loading }) => {
  const [isloading, setIsloading] = useState(false);
  const { filters, formData, setFormData } = useContext(FiltersContext);
  const { data: allUsers } = useUserQuery();
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();
  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();

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

  useEffect(() => {
    getCountriesMutation()
    const payload = formData;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) delete formData[key];
    });
    userNameMutation(payload);
  }, []);

  const renderLeftSideFilter = () => {
    return (
      <>
        <Collapse defaultActiveKey={[""]}>
       {formData?.experienceMinimum && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('experience')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, experienceMinimum: '', experienceMaximum: ''})
        }} className="close-icon" /></div>}
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
        {formData?.ageMinimum && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('age')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, ageMinimum: '', ageMaximum: ''})
        }} className="close-icon" /></div>}
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
        {formData?.gender && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('gender')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, gender: ''})
        }} className="close-icon" /></div> }
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
            options={
              countriesList &&
              countriesList?.map((item, idx) => {
                const list = `${item?.emoji} ${item?.value}`
                return {
                  _id: idx,
                  id: idx,
                  key: idx,
                  code: item?.phone_code,
                  value: item?.country_name 
                };
              })
            }
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
            options={budgetFilter}
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

  const renderShowValue = (key) => {
    switch (key) {
      case "available":
        return formData.available || ''
      case "experience":
        return formData?.experienceMinimum && `${formData?.experienceMinimum || ''} - ${formData?.experienceMaximum || ''}`
      case "location":
        return `${formData?.country || ''}${formData?.state || ''}${formData?.city && formData?.city || '' }`
      case "gender":
        return formData.gender && formData.gender.toString() || '' 
      case "age":
        return formData?.ageMinimum && `${formData?.ageMinimum || '' } - ${formData?.ageMaximum || ''}`
      case "weight":
        return formData?.weightMinimum && `${formData?.weightMinimum || '' } - ${formData?.weightMaximum || ''}`
      case "height":
        return formData?.heightMinimum && `${formData?.heightMinimum || '' } - ${formData?.heightMaximum || ''}`
      case "budget":
        return formData?.budgetMinimum && `${formData?.budgetMinimum || '' } - ${formData?.budgetMaximum || ''}`
      case "language":
        return formData.languages && formData.languages.toString() || '' 
      case "best-in":
        return formData.bestIn || ''
      case "extra-talent":
        return formData.extraTalent || '' 
      case "eye-color":
        return formData.eyeColor || '' 
      case "hair-color":
        return formData.hairColor || '' 
      case "skin-tone":
        return formData.skinTone || '' 
      default:
        return null;
    }
  };

  const renderEmptyValue = (key) => {
    switch (key) {
      case "available":
        return setFormData({...formData, available: null});
      case "experience":
        return setFormData({...formData, experienceMinimum: null, experienceMaximum: null});
      case "location":
        return  setFormData({...formData, country: null, state: null,  city: null});
      case "gender":
        return setFormData({...formData, gender: []});
      case "age":
        return setFormData({...formData, ageMinimum: null, ageMaximum: null});
      case "weight":
        return  setFormData({...formData, weightMinimum: null, weightMaximum: null});
      case "height":
        return setFormData({...formData, heightMinimum: null, heightMaximum: null});
      case "budget":
        return setFormData({...formData, budgetMinimum: null, budgetMaximum: null});
      case "language":
        return setFormData({...formData, languages: []}); 
      case "best-in":
        return setFormData({...formData, bestIn: null});
      case "extra-talent":
        return setFormData({...formData, extraTalent: null}); 
      case "eye-color":
        return setFormData({...formData, eyeColor: null});
      case "hair-color":
        return setFormData({...formData, hairColor: null}); 
      case "skin-tone":
        return setFormData({...formData, skinTone: null}); 
      default:
        return null;
    }
  };

console.log(formData['experienceMinimum'], 'formData[item.key]')
  const renderConditionFilter = () => {
    return filters?.length
      ? filters.map((item, idx) => {
          return (
            <>
              <Collapse defaultActiveKey={[""]}>
             {renderShowValue(item.key) && <div className="active-filters"> <div className='show-text-value'>{renderShowValue(item.key)}</div><CloseCircleOutlined onClick={() => {
              renderEmptyValue(item.key);
              }} className="close-icon" /></div>}

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
          {/*  <InfiniteScrollCard formData={formData} userNameMutation={userNameMutation} />*/}
          {/* <CommonScroll allUsers={allUsers} userNameMutation={userNameMutation}  />*/}
        </div>

        <div className="banner-container">
          <img src={banner} alt="ad" width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default CommonDataBaseList;
