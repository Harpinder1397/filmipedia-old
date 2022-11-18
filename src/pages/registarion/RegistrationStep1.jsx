import React, { useRef, useState, useCallback } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Upload,
  message,
  Col,
  Row
} from 'antd';
import './Registration.less';
import { useHistory } from 'react-router-dom';
import { createUserApi } from '../../api/user';
import FileUploaderWithImageCropper from '../../common/FileUploaderWithImageCropper';
import { checkFieldType, passwordValidator, emailValidator, onChangeInput } from '../../common/utils';
import { UploadOutlined } from '@ant-design/icons';
import FormInput from '../../common/inputs/FormInput';
import FormSelect from '../../common/inputs/FormSelect';
import { genderOptions } from '../../constant/common';

const handleEmailValidation = (e, formDataErrors, setFormDataErrors) => {
  const {name, value} = e.target;
  const errMsg = emailValidator(value)
  if (errMsg) return setFormDataErrors({...formDataErrors, [name]: errMsg})
  setFormDataErrors({...formDataErrors, [name]: ''})
}

const handleMobileValidation = (e, formDataErrors, setFormDataErrors) => {
  const {name, value} = e.target;
  const errMsg = "Mobile number is not valid."
  if (value.length < 10 || value < 0) return setFormDataErrors({...formDataErrors, [name]: errMsg})
  setFormDataErrors({...formDataErrors, [name]: ''})
}

const handlePasswordValidation = (e, formDataErrors, setFormDataErrors) => {
  const {name, value} = e.target;
  const errMsg = passwordValidator(value)
  if (errMsg) return setFormDataErrors({...formDataErrors, [name]: errMsg})
  setFormDataErrors({...formDataErrors, [name]: ''})
}

const isPasswordConfirmed = (formData, formDataErrors, setFormDataErrors) => {
  const errMsg = "password is not confirmed yet"
  if(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) {
    return setFormDataErrors({...formDataErrors, 'confirmPassword': ''})
  }
  setFormDataErrors({...formDataErrors, 'confirmPassword': errMsg})
}

const RegistrationStep1 = (props) => {
  const history = useHistory();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({})
  const [formDataErrors, setFormDataErrors] = useState({})
  const [image, setImage] = useState(undefined);

  const handleSubmit = async () => {
    const { userName, fullName, password, gender, dateOfBirth } = formData;
    if(!userName || !fullName || !password || !dateOfBirth || !gender) {
      return message.error('Please fill in mandatory fields.');
    }

    // if(confirmPassword !== password) return message.error('Please confirm the password.');
    // if(!Object.values(formDataErrors).every(val => val === '')) return
    // props.setStep(2);
    // var fd = new FormData();
    // fd.append('imgUploader', file);
    // const payload = {
    //   userName: formData.userName,
    //   mobile: formData.mobile,
    //   password: formData.password,
    //   email: formData.email
    // }
    const loginResponse = await createUserApi(formData);
    // setImage(loginResponse);
    // return null;
  };

  const checkImageType = (type) => {
    const validImageTypes = ['gif', 'image/jpeg', 'image/png', 'image/jpg'];
    return checkFieldType(type, validImageTypes)
  }

  const uploadThumbnail = useCallback((files) => {
    setIsLoading(true);
   
    if (files) {
      const { type, name } = files.file.originFileObj;
      setIsLoading(false);
      if(!checkImageType(type)) {
        return alert('wrong file format');
      }
      setFile(files.file.originFileObj)
    }
  }, []);

  console.log('formData', formData);

  const onChange = (e) => {
    onChangeInput(e, formData, setFormData);
  }

  return (
    <div 
      className="form-container"
    >
    <h1>Register</h1>
    <FormInput 
      type="text"
      name="fullName"
      label="Full Name"
      value={formData.fullName}
      onChange={onChange}
      required
    />
    <Row gutter={[4,12]}>
      
      <Col span={12}>
        <FormInput
					type="date"
					name="dateOfBirth"
					label="Date of birth"
					value={formData.dateOfBirth}
					onChange={onChange}
					validationError={formDataErrors.dateOfBirth}
					required
				// disabled
				/>
      </Col>
      <Col span={12}>
        <FormSelect
          name="gender"
          label="Gender"
          value={formData.gender}
          onSelect={(cat, val) => {
            setFormData({...formData, gender: val.children})
          }}
          options={genderOptions}
          showSearch
          required
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          validationError={formDataErrors.states}
          width={"100%"}
        />
      </Col>
    </Row>
    <FormInput 
      type="text"
      name="userName"
      label="Email or mobile number"
      value={formData.userName}
      onChange={onChange}
      validationError={formDataErrors.userName}
      required
    />
    {/* <FormInput 
      type="text"
      name="email"
      label="Your email"
      value={formData.email}
      onChange={onChange}
      onKeyUp={(e) => 
        handleEmailValidation(e, formDataErrors, setFormDataErrors)
      }
      validationError={formDataErrors.email}
      // disabled
    /> */}
    <FormInput 
      type="password"
      name="password"
      label="Password"
      value={formData.password}
      onChange={onChange}
      onKeyUp={(e) => 
        handlePasswordValidation(e, formDataErrors, setFormDataErrors)
      }
      validationError={formDataErrors.password}
      required
    />
    {/* <FormInput 
      type="password"
      name="confirmPassword"
      label="please verify password"
      value={formData.confirmPassword}
      onChange={onChange}
      onKeyUp={() => 
        isPasswordConfirmed(formData, formDataErrors, setFormDataErrors)
      }
      validationError={formDataErrors.confirmPassword}
      required
    /> */}
      <Form.Item> 
        <Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block>
          Register
        </Button>
      </Form.Item>
    </div>
  );
};

export default RegistrationStep1;
