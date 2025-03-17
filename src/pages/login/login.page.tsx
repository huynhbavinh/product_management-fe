import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/http';
import { useState, useEffect } from "react";

function LoginComponent() {
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
      const response = await axiosInstance.post('users/login', values);
      if (response) localStorage.setItem('loggedIn', 'true');
      setShowAlert(true);
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlert(false);
        setShowAlertSuccess(false);
        navigator("/");
      }, 600); // Hide alert after 2 seconds and navigate to home
    } catch (error) {
      console.error("Login error: ", error);
      setShowAlert(true);
      setShowAlertError(true);
      setTimeout(() => {
        setShowAlertError(false);
        setShowAlert(false);
      }, 1000); // Hide alert after 2 seconds
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <span className="icon-login"></span>
        <h1 className="label">Login</h1>
        <Form
          name="login"
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
              Log in
            </Button>
            or <Link to="/register">Register now!</Link>
          </Form.Item>
        </Form>
      </div>
      <div className={`overlay ${showAlert ? 'show' : ''}`}>
        <Alert style={{
          display: showAlertSuccess ? 'block' : 'none',
        }} message="Login successful" type="success" />
        <Alert style={{
          display: showAlertError ? 'block' : 'none',
        }} message="Login fail, please try again!" type="error" />
      </div>
    </div>
  );
}

export default LoginComponent;