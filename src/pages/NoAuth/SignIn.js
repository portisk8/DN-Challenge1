import React from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../../assets/images/AP.png";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../../components/Layout/Footer";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;

function SignIn() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.setItem("token", "token123");
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout
        className="layout-default layout-signin"
        style={{ minHeight: "100vh" }}
      >
        <Content
          className="signin"
          style={{ display: "grid", alignItems: "center" }}
        >
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 6 }} md={{ span: 12 }}>
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12, display: "grid", alignItems: "center" }}
              xs={{ span: 24 }}
              lg={{ span: 6 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default SignIn;
