import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/http';
import { useState, useEffect } from "react";

function RegisterComponent() {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      navigator('/');
    }
  }, [navigator]);

  const onFinish = async (values: {email: string, password: string}) => {
    try {
      const response = await axiosInstance.post('users/register', values);
      console.log("Received values of form register: ", response.data);
      setShowAlert(true);
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlert(false);
        setShowAlertSuccess(false);
        navigator("/login");
      }, 600);
    } catch (error) {
      console.error("Register error: ", error);
      setShowAlert(true);
      setShowAlertError(true);
      setTimeout(() => {
        setShowAlertError(false);
        setShowAlert(false);
      }, 1000);
    }
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <span className="icon-login"></span>
        <h1 className="label">Join Us!</h1>
        <Form
          name="register"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: 'email', message: 'The input is not valid E-mail!' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Register Now
            </Button>
            or <Link to={'/login'}>Have an account!</Link>
          </Form.Item>
        </Form>
      </div>
      <div className={`overlay ${showAlert ? 'show' : ''}`}>
        <Alert style={{
          display: showAlertSuccess ? 'block' : 'none',
        }} message="Register successful! Logged you in" type="success" />
        <Alert style={{
          display: showAlertError ? 'block' : 'none',
        }} message={"Register fail, please try again!"} type="error" />
      </div>
    </div>
  );
}

export default RegisterComponent;