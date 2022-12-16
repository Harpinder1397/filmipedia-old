import React, { useState, useEffect, useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from '../../assets/images/banner.png';
import { useUpdateUserNameMutation,  } from "../../api/user";
import FilterMenu from "./FilterMenu";
import { Spin } from "antd";
import CommonPagination from "../../common/pagination/CommonPagination";
import { languageFilter, genderFilter, experienceFilter, ageFilter, bestInOptions } from "../../constant/common";

import { FiltersContext } from "../../App";

const CommonDataBaseList = ({ allUsers, isFav, loading }) => {
	const [formData, setFormData] = useState({});
	const [isloading, setIsloading] = useState(false);
  const { filters } = useContext(FiltersContext);
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();
  const onShowSizeChange = (page, limit) => {
    const payload = {
      ...formData,
      page: page,
      // limit: limit
    };
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    userNameMutation(payload)
  }

  useEffect(() => {
    const payload = formData;
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    userNameMutation(payload)
  }, [formData])

  const renderLeftSideFilter = () => {
    return (
<>
        <SubCategoryComponent
          title='Experience'
          name='experience'
          subCategoryFilter={experienceFilter}
          formData={formData}
          setFormData={setFormData}
        />
        <SubCategoryComponent
          title='Age'
          name='age'
          subCategoryFilter={ageFilter}
          formData={formData}
          setFormData={setFormData}
        />
        <SubCategoryComponent
          title='Gender'
          name='gender'
          subCategoryFilter={genderFilter}
          formData={formData}
          setFormData={setFormData}
        />
    </>
    )
      
    }

  const renderFilterComponent = (key) => {
    switch (key) {
      case 'experience':
        return (
          <SubCategoryComponent
            title='Experience'
            name='experience'
            subCategoryFilter={experienceFilter}
            formData={formData}
            setFormData={setFormData}
          />
      );
      case 'location':
        return (
          <SubCategoryComponent
            title='Location'
            name='location'
            subCategoryFilter={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
      );
      case 'gender':
        return (
          <SubCategoryComponent
          title='Gender'
          name='gender'
          subCategoryFilter={genderFilter}
          formData={formData}
          setFormData={setFormData}
        />
      );
      case 'age':
        return (
          <SubCategoryComponent
            title='Age'
            name='age'
            subCategoryFilter={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
      );
      case 'language':
        return (
          <SubCategoryComponent
          title='Language'
          name='languages'
          subCategoryFilter={languageFilter}
          formData={formData}
          setFormData={setFormData}
        />
      );
      case 'best-in':
        return (
          <SubCategoryComponent
            title='Best In'
            name='bestIn'
            value={formData?.bestIn}
            formData={formData}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({...formData, bestIn: val.value})
            }}
            onClear={() => setFormData({...formData, bestIn: ''})}
            options={bestInOptions}
          />
        );
      default:  return null
    }
  }
  return (
    <div className="list-con">
      <div className='left-side-bar'>
        {
          filters?.length ? filters.map((item) => {
            return renderFilterComponent(item.key)
          }) : (
            renderLeftSideFilter()
          )
        }
      </div>

      <div className="database-right-side-section">
      <FilterMenu renderLeftSideFilter={renderLeftSideFilter} setIsloading={setIsloading} />
        <div className='database-container'>
          <CommonList
            users={allUsers?.users || allUsers}
            isFav={isFav}
            isLoading={isLoading || loading || isloading}
          />
          {/*<InfiniteScrollCard formData={formData} userNameMutation={userNameMutation} />*/}
          <div className="pagination-section">
         {allUsers?.total >= 9 && allUsers?.users?.length >= 9 && <CommonPagination total={allUsers?.total} current={allUsers?.users?.length} onShowSizeChange={onShowSizeChange}/>}
          </div>
        </div>

        <div className='banner-container'>
          <img src={banner} alt="ad" width={'100%'}/>
        </div>
      </div>
    </div>
  )
}

export default CommonDataBaseList;