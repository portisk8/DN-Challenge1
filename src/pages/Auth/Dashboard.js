import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  employeesAll,
  employeesFilterName,
} from "../../services/dasboardService";
import { useWindowSize } from "../../components/Hooks/useWindowSize";

const { Search } = Input;

function Dashboard() {
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const [data, setData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    showTotal: (total, range) =>
      `${range[0]}-${range[1]} of ${total} employees`,
    pageSize: 2,
    showSizeChanger: true,
    pageSizeOptions: [2, 5, 10, 15],
  });

  useEffect(() => {
    setColumns([
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        responsive: ["sm"],
        render: (text) => text,
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => text,
        sorter: (a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        },
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        responsive: ["md"],
        sorter: (a, b) => {
          if (a.username > b.username) {
            return 1;
          }
          if (a.username < b.username) {
            return -1;
          }
          return 0;
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        responsive: ["lg"],
        sorter: (a, b) => {
          if (a.email > b.email) {
            return 1;
          }
          if (a.email < b.email) {
            return -1;
          }
          return 0;
        },
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        responsive: ["lg"],
        sorter: (a, b) => {
          if (a.role > b.role) {
            return 1;
          }
          if (a.role < b.role) {
            return -1;
          }
          return 0;
        },
      },
    ]);
    getInitialTable();
  }, []);
  const getInitialTable = async () => {
    await onSearchTable("");
  };
  const onChangeTable = (e) => {
    console.log(e);
    pagination.current = e.current;
    pagination.pageSize = e.pageSize;
    pagination.total = e.total;
    setPagination(pagination);
    let slice = data.slice(
      (pagination.current - 1) * pagination.pageSize,
      pagination.current * pagination.pageSize
    );
    setDataSource(slice);
  };

  const onSearchTable = async (name) => {
    console.log("Success:", name);
    let response;
    let dataResult;
    response = await employeesAll();
    dataResult = response?.data.employees;

    dataResult?.forEach((e) => {
      e.key = e.id;
    });
    setData(dataResult);

    pagination.total = dataResult?.length || 0;
    pagination.current = 1;
    setPagination(pagination);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/sign-in");
          }}
        >
          Remove Token
        </Button>
      </div> */}
      <div>
        <Row justify="end">
          <Col xs={24} md={12}>
            <Search
              placeholder="input search text"
              onSearch={onSearchTable}
              enterButton
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          locale={{ emptyText: "No employees found" }}
          onChange={onChangeTable}
          expandable={{
            expandedRowRender: (record) => {
              var showData = [];
              if (windowSize.width < 575)
                showData.push(
                  <div>
                    <p style={{ margin: 0 }}>Id: {record.id}</p>
                  </div>
                );
              if (windowSize.width < 765)
                showData.push(
                  <div>
                    <p style={{ margin: 0 }}>Username: {record.username}</p>
                  </div>
                );
              if (windowSize.width < 1000)
                showData.push(
                  <div>
                    <p style={{ margin: 0 }}>Email: {record.email}</p>
                    <p style={{ margin: 0 }}>Role: {record.role}</p>
                  </div>
                );
              return showData;
            },
            rowExpandable: (record) => windowSize.width < 1000,
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
