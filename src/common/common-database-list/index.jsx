import React, { useState, useEffect, useContext } from "react";
import { Checkbox, Typography } from "antd";
import 'react-calendar/dist/Calendar.css';
// import './style.less'
// import { mapStates, mapCities } from 'common/utils';
import { FiltersContext } from "../../App";
// import Requirements from "components/requirements/Requirements";
// import { getMyFavouritesApi } from "api/favourites";
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from '../../assets/images/banner.png';
import { useUpdateUserNameMutation } from "../../api/user";

const CommonDataBaseList = ({ allUsers, isFav }) => {
	const { selectedSubCategories } = useContext(FiltersContext);
	const [formData, setFormData] = useState({});
  const experienceFilter = [
    {
      key: 1,
      name: '0 - 5',
      objName: 'experience',
      value: 5,
    },
    {
      key: 2,
      name: '6 - 10',
      value: 10,
      objName: 'experience'
    },
    {
      key: 3,
      name: '11 - 15',
      value: 15,
      objName: 'experience'
    },
    {
      key: 4,
      name: '16 - 20',
      value: 20,
      objName: 'experience'
    },
    {
      key: 5,
      name: '21 - 25',
      value: 20,
      objName: 'experience'
    }
  ]

  const ageFilter = [
    {
      key: 1,
      name: 'Baby (0 - 3)',
      objName: 'age',
      value: 5,
    },
    {
      key: 2,
      name: 'Child (4 - 12)',
      value: 10,
      objName: 'age'
    },
    {
      key: 3,
      name: 'Teenager (13 - 19)',
      value: 15,
      objName: 'age'
    },
    {
      key: 4,
      name: 'Adult (20 - 59)',
      value: 20,
      objName: 'age'
    },
    {
      key: 5,
      name: 'Senior (60 and Up)',
      value: 20,
      objName: 'age'
    }
  ]

  const genderFilter = [
    {
      key: 1,
      name: 'Male',
      objName: 'gender',
      value: 'male',
    },
    {
      key: 2,
      name: 'Female',
      value: 'female',
      objName: 'gender'
    },
    {
      key: 3,
      name: 'Other',
      value: 'other',
      objName: 'gender'
    }
  ]

  const languageFilter = [
    {
      key: 1,
      name: 'Hindi',
      objName: 'language',
      value: 'hindi',
    },
    {
      key: 2,
      name: 'English',
      value: 'english',
      objName: 'language'
    },
    {
      key: 3,
      name: 'Spanish',
      value: 'spanish',
      objName: 'language'
    }
  ]

  const { mutate: userNameMutation } = useUpdateUserNameMutation();

console.log(formData, 'formData?.experience')
  useEffect(() => {
    // const payloadSubCategory = {
    //   gt: formData?.experience - 5,
    //   lt: formData?.experience,
    // }
    // // const payload = formData?.subCategory === null ? payloadSubCategory : formData
    // userNameMutation(!formData?.experience ? formData : payloadSubCategory)
  }, [formData])

  return (
    <div className="list-con">
      <div className='left-side-bar'>
        {/*
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
              */}
          <SubCategoryComponent
            title='Experience'
            subCategoryFilter={experienceFilter}
            formData={formData}
            setFormData={setFormData}
          />
          <SubCategoryComponent
            title='Location'
            subCategoryFilter={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
          <SubCategoryComponent
            title='Age'
            subCategoryFilter={ageFilter}
            formData={formData}
            setFormData={setFormData}
          />
          <SubCategoryComponent
            title='Gender'
            subCategoryFilter={genderFilter}
            formData={formData}
            setFormData={setFormData}
          />
          <SubCategoryComponent
            title='Language'
            subCategoryFilter={languageFilter}
            formData={formData}
            setFormData={setFormData}
          />
          
      </div>

      <div className='database-container'>
        <CommonList
          users={allUsers}
          isFav={isFav}
        />
      </div>

      <div className='banner-container'>
        <img src={banner} alt="ad" width={'100%'}/>
      </div>
    </div>
  )
}

export default CommonDataBaseList;