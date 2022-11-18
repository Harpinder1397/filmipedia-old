import React, { useState, useContext, useEffect } from 'react';
import {
  Layout,
  Menu,
  Row,
  Button,
  Select,
  Input,
  Spin,
} from 'antd';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import './Navbar.less';
import { FiltersContext } from '../../App';
import FormSelect from '../../common/inputs/FormSelect';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useUpdateUserNameMutation } from '../../api/user';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const history = useHistory();
  const [toRegister, setToRegister] = useState(false);
	const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const { categories, setSubCategories, selectedSubCategories, category, token, setToken, tags, subCategory, setSubCategory } = useContext(FiltersContext)
  const list = useSelector((state) => state);
  console.log(list, 'list')
  const handelLogout = () => {
    setToken(false);
    window.localStorage.clear();
    history.push('/');
  };
  const onClickCancel = () => {
    setToRegister(false);
  }  

  const { mutate: userNameMutation, isSuccess, isLoading } = useUpdateUserNameMutation();
  // useEffect(() => {
    // let db = {}; 
    // const payloadSubCategory = {
    //   ...formData,
    //   category: formData?.category
    // }
    // const payload = formData
    // userNameMutation(payload)
    // var paylaod;
      // cosnt payload = formData?.subCategory === null ? payloadSubCategory : formData
      // return paylaod = formData?.category
    // const payloadSubCategory = 
    //   formData?.fullName fullName: formData?.fullName,
    //   category: formData?.category
    // }
    
  //   const payload = formData
  //   userNameMutation(payload)
  // }, [formData])

  useEffect(() => {
    setLoading(true);
    // if(isLoading){
      // setLoading(isLoading);
    // }
    // if(isSuccess){
      // setLoading(false);
    // }
    const timeOutId = setTimeout(async() => {
      const payload = formData
      userNameMutation(payload)
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [formData]);


  return (
   // <Spin spinning={loading}>
   <Layout.Header className="navbar">
   <Row justify="space-between" align="middle">
     <div className="ant-row ant-row-middle navbar__left">
       {/* <div className="navbar__logo" > */}
         {/* F I L M I P E D I A */}
       {/* W E B S I T E */}
        
       {/* </div> */}
      <div className="d-flex">
       <FormSelect
         allowClear={true}
         showSearch
         placeholder="Please select"
         className="navbar__category-selector"
         onSelect={(id, val) => {
           const getSubCategories = categories.filter((item) => item.id == val.id)
           setSubCategoriesList(getSubCategories[0].childern);
           setSubCategories(val.id)
           // HandlenewChnage()
           setLoading(true);
           setFormData({...formData, category: val.value, subCategory: ''})
         }}
         onClear={() => {
           setFormData({...formData, category: '', subCategory: ''})
           setSubCategories('')
         }}
         options={categories}
         filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 } 
         value={formData?.category}
       />
       <FormSelect
         allowClear={true}
         showSearch
         placeholder="Please select"
         className="navbar__tag-selector"
         onSelect={(id, val) =>{
           // selectedSubCategories(id);
           // setSubCategory(val.key)
           setFormData({...formData, subCategory: val.value})
         }}
         onClear={() => setFormData({...formData, subCategory: ''})}
         options={subCategoriesList}
         filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 } 
         // width={'50%'}
         value={formData?.subCategory}
       />
     </div>
     </div>

     {/* <div className="d-flex">
       <FormSelect
         allowClear={true}
         showSearch
         placeholder="Please select"
         className="navbar__category-selector"
         onSelect={(id, val) => {
           const getSubCategories = categories.filter((item) => item.id == val.id)
           setSubCategoriesList(getSubCategories[0].childern);
           setSubCategories(val.id)
           // HandlenewChnage()
           setFormData({category: val.value})
         }}
         onClear={() => setFormData(null)}
         options={categories}
         filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 } 
         value={formData?.category}
       />
       <FormSelect
         allowClear={true}
         showSearch
         placeholder="Please select"
         className="navbar__tag-selector"
         onSelect={(id, val) =>{
           // selectedSubCategories(id);
           // setSubCategory(val.key)
           setFormData({...formData, subCategory: val.value})
         }}
         onClear={() => setFormData({...formData, subCategory: null})}
         options={subCategoriesList}
         filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 } 
         // width={'50%'}
         value={formData?.subCategory}
       />
     </div> */}
     <Input
         name='fullName'
         className='navbar-search-input'
         placeholder="Search"
         value={formData?.fullName}
         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
       />
     <div className="navbar__right">
       {token
         ? (
           <>
             <Button type="primary" onClick={()=>history.push('/timeline')}>Timeline</Button>
             <Button type="primary" onClick={()=>history.push('/jobs')}>Jobs</Button>
             <Button type="primary" onClick={()=>history.push('/database')}>Database</Button>
             {/* <Button type="primary" onClick={()=>history.push('/messages')}>Messages</Button> */}
             <Button type="primary" onClick={()=>history.push('/my-profile')}>My Info</Button>
             <Button type="primary" onClick={()=>history.push('/shortlisted')}>Shortlisted</Button>
             <Button type="primary" onClick={()=>history.push('/admin')}>Admin</Button>
             <Button type="primary" onClick={handelLogout} ghost>Sign Out</Button>
           </>
         ) :
           <>
             <Button type="primary" onClick={()=>history.push('/database')}>Database</Button>
             <Button type="primary" onClick={()=>history.push('/register')}>Sign Up</Button>
             <Button type="primary" onClick={()=>history.push('/signin')}>Sign in</Button>
           </>
       }
     </div>
     {/* <div className="navbar__right">
       <Button type="text">
         <MailOutlined />
       </Button>
       <Button type="text">
         <BellOutlined />
       </Button>
       <Button type="text">
         <ShoppingCartOutlined />
       </Button>
       <Button type="text">
         <UserOutlined />
       </Button>
     </div> */}
   </Row>
   {
     tags?.length ?
     <Row className="navbar__tags-container">
       {
         tags?.map((tag) => (
           <div className="nav-subBar">{tag.value}</div>
         ))
       }
     </Row>
     : null
   }
 </Layout.Header>
 // </Spin>
  );
};

export default Navbar;
