import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from '../../assets/images/banner.png';
import { useUpdateUserNameMutation,  } from "../../api/user";
import FilterMenu from "./FilterMenu";
import { Spin } from "antd";
import CommonPagination from "../../common/pagination/CommonPagination";
import { languageFilter, genderFilter, experienceFilter, ageFilter } from "../../constant/common";

const CommonDataBaseList = ({ allUsers, isFav, loading }) => {
	const [formData, setFormData] = useState({});
	const [isloading, setIsloading] = useState(false);

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
    console.log([...Array(10).keys()], '[...Array(10).keys()]')
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
          title='Location'
          name='location'
          subCategoryFilter={ageFilter}
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
        <SubCategoryComponent
          title='Language'
          name='languages'
          subCategoryFilter={languageFilter}
          formData={formData}
          setFormData={setFormData}
        />
    </>
    )
  }

  return (
    <div className="list-con">
      <div className='left-side-bar'>
        {renderLeftSideFilter()}
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