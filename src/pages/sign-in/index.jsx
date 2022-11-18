import React, { useRef, useState, useContext} from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  notification,
  Alert,
} from 'antd';
import './SignIn.less';
import { useHistory } from 'react-router-dom';
import { LoginAPI } from '../../api/auth';
import { FiltersContext } from '../../App';

const SignIn = (props) => {
  const history = useHistory();
  const formRef = useRef();
  const { setToken, setProfileCompleted } = useContext(FiltersContext)

  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    const { email, password } = formRef.current.getFieldsValue();
    const payload = {
      userName: email,
      password,
    };
    const loginResponse = await LoginAPI(payload, setProfileCompleted);
    console.log(loginResponse, 'loginResponse')
    if (loginResponse) {
      // console.log
      setToken(loginResponse);
      history.push("/database")
    } else {
      setErrorMsg('Incorrect userName or password');
    }
    return null;
  };

  return (
    <div className="signIn-container">
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
      <h1>Sign In</h1>
      <Form
        layout="vertical"
        ref={formRef}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="text" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block>
            Sign In
          </Button>
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember Me</Checkbox>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default SignIn;
