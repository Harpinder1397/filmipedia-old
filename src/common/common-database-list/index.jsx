import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Checkbox, Typography } from "antd";
import 'react-calendar/dist/Calendar.css';
// import './style.less'
// import { mapStates, mapCities } from 'common/utils';
import { FiltersContext } from "../../App";
// import Requirements from "components/requirements/Requirements";
// import { getMyFavouritesApi } from "api/favourites";
import SubCategoryComponent from "../../common/SubCategories";
import CommonList from "../../common/CommonList";
import banner from '../../assets/images/banner.png';
import { useUpdateUserNameMutation } from "../../api/user";

const CommonDataBaseList = ({ allUsers, isFav }) => {
	const { selectedSubCategories } = useContext(FiltersContext);
	const [formData, setFormData] = useState({});
  console.log(formData, 'setFormData')
  const list = [
    {
      key: 1,
      name: '0 - 5',
      objName: 'experience',
      value: 5,
    },
    {
      key: 2,
      name: '5 - 10',
      value: 10,
      objName: 'experience'
    },
    {
      key: 2,
      name: '10 - 15',
      value: 15,
      objName: 'experience'
    }
  ]

  const { mutate: userNameMutation } = useUpdateUserNameMutation();

console.log(formData, 'formData')
  useEffect(() => {
    const payloadSubCategory = {
      gt: formData?.experience - 5,
      lt: formData?.experience,
    }
    // const payload = formData?.subCategory === null ? payloadSubCategory : formData
    userNameMutation(!formData?.experience ? formData : payloadSubCategory)
  }, [formData])

  return (
    <div className="list-con">
      <div className='left-side-bar'>
        {
          selectedSubCategories?.length ?
            <div className="sub-categories-container br-left">
              <div className="title br-left">
                <Typography.Title level={3}>Sub Category</Typography.Title>
              </div>           
              <div className="filter-container">
                {
                  selectedSubCategories.map((subCat) =>
                    <Checkbox
                      onChange={(e)=>console.log('event', e.target.value)} 
                      value={subCat.id}
                      style={{ marginTop: '20px'}}
                    >
                      <span style={{ fontSize: '16px' }}>{subCat.value}</span>
                    </Checkbox>
                  )
                }
              </div>
          
              
            </div> : null 
          }
          <SubCategoryComponent
            title='Experience'
            subCategoryFilter={list}
            formData={formData}
            setFormData={setFormData}
          />
          {/* <SubCategoryComponent subCategoryFilter={selectedSubCategories} />
          <SubCategoryComponent subCategoryFilter={selectedSubCategories} />
          <SubCategoryComponent subCategoryFilter={selectedSubCategories} /> */}
      </div>

      <div className='database-container'>
        <CommonList
          users={allUsers}
          isFav={isFav}
        />
      </div>

      <div className='banner-container'>
        <img src={banner} width={'100%'}/>
        {/* <SubCategoryComponent subCategoryFilter={selectedSubCategories} /> */}
      </div>
    </div>
  )
}

export default CommonDataBaseList;