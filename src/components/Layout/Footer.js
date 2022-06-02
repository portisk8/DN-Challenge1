import React from "react";
import { Layout } from "antd";
const { Footer: AntdFooter } = Layout;

function Footer() {
  return (
    <AntdFooter style={{ textAlign: "center" }}>Ant Design ©2022</AntdFooter>
  );
}

export default Footer;
