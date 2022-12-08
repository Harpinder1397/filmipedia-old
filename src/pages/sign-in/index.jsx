import React, { useRef, useState, useContext, useEffect} from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  notification,
  Alert,
  Spin,
  InputNumber,
  Select,
} from 'antd';
import './SignIn.less';
import { Link, useHistory } from 'react-router-dom';
import { LoginAPI } from '../../api/auth';
import { FiltersContext } from '../../App';
import FormInput from '../../common/inputs/FormInput';
import { useGetCountriesMutation, useGetCountriesQuery } from '../../api/getCountries';

const { Option } = Select;

const SignIn = (props) => {
  const history = useHistory();
  const formRef = useRef();
  const [formData, setFormData] = useState({});
  const [selectCountry, setSelectCountry] = useState('+91');
  const [isLoading, setIsloading] = useState(false);
  const { setToken, setProfileCompleted } = useContext(FiltersContext)

  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();

  const [errorMsg, setErrorMsg] = useState('')

console.log(countriesList, 'countriesList')
  
  const handleSubmit = async () => {
    setIsloading(true);
    const { mobileNumber, password } = formRef.current.getFieldsValue();

    const payload = {
      mobileNumber: selectCountry+formData.mobileNumber,
      password,
    };
    const loginResponse = await LoginAPI(payload, setProfileCompleted);
    console.log(loginResponse, 'loginResponse')
    if (loginResponse) {
      // console.log
      setToken(loginResponse);
      history.push("/database")
      setIsloading(false);
    } else {
      setErrorMsg('Incorrect userName or password');
      setIsloading(false);
    }
    return null;
  };

  useEffect(() => {
    getCountriesMutation();
  }, [])
  

  return (
    // <Spin spinning={isLoading}>
    // <div className="signIn-container">
    //   {
    //     errorMsg && 
    //     <Alert
    //       message={errorMsg}
    //       showIcon
    //       type="error"
    //       closable
    //       onClose={() => setErrorMsg('')}
    //     />
    //   }
    //   <h1>Sign In</h1>
    //   <Form
    //     layout="vertical"
    //     ref={formRef}
    //   >
    //     <Form.Item
    //       label="Email"
    //       name="email"
    //       rules={[{ required: true, message: 'Please input your email!' }]}
    //     >
    //       <Input type="text" placeholder="Enter your email" />
    //     </Form.Item>
    //     <Form.Item
    //       label="Password"
    //       name="password"
    //       rules={[{ required: true, message: 'Please input your password!' }]}
    //     >
    //       <Input.Password placeholder="Enter your password" />
    //     </Form.Item>
    //     <Form.Item>
    //       <Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block>
    //         Sign In
    //       </Button>
    //     </Form.Item>
    //     {/* <Form.Item name="remember" valuePropName="checked">
    //       <Checkbox>Remember Me</Checkbox>
    //     </Form.Item> */}
    //   </Form>
    // </div>
    // </Spin>

    <div 
      className="form-container"
    >
    <Spin spinning={isLoading}>
    <h1>Login</h1>
      {
        errorMsg && 
        <Alert
          message={errorMsg}
          showIcon
          type="error"
          closable
          onClose={() => setErrorMsg('')}
        />
      }
    <Form
        layout="vertical"
        ref={formRef}
      >
        <Form.Item
          label="Mobile Number"
          name="mobileNumber"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
        <Input.Group compact>
        <Select value={selectCountry} onChange={(e) => setSelectCountry(e)}>
          {
            countriesList?.map((item) => {
             return <Option key={item?._id} value={item?.phone_code}>{item?.phone_code}</Option>
              
            })
          }
        </Select>
        <InputNumber onChange={(e) => setFormData({'mobileNumber': e})} type="text" placeholder="Enter your mobile number" />
      </Input.Group>
      </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item className='register-button'> 
          <Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block>
            Log in
          </Button>
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember Me</Checkbox>
        </Form.Item> */}
       
      </Form>
       <Link to="/register" className='signIn-link'>
          Sign Up
      </Link>
    </Spin>
    </div>
  );
};

export default SignIn;
