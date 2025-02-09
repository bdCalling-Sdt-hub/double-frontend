import React, { useState } from "react";
import { Input, Table, Tag, Button, Modal, Form, Select } from "antd";
import { FaEdit } from "react-icons/fa";

const { Option } = Select;

const UserManagement = () => {
  const [data, setData] = useState([
    {
      key: "1",
      username: "john_doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      address: "123 Main St, Cityville",
      engagement: 15,
    },
    {
      key: "2",
      username: "jane_smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
      address: "456 Oak St, Townsville",
      engagement: 5,
    },
    {
      key: "3",
      username: "mike_brown",
      email: "mike.brown@example.com",
      role: "User",
      status: "Active",
      address: "789 Pine St, Villageville",
      engagement: 20,
    },
    {
      key: "4",
      username: "susan_white",
      email: "susan.white@example.com",
      role: "Admin",
      status: "Pending",
      address: "101 Maple St, Suburbia",
      engagement: 2,
    },
    {
      key: "5",
      username: "david_jones",
      email: "david.jones@example.com",
      role: "User",
      status: "Inactive",
      address: "202 Birch St, Metropolis",
      engagement: 10,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = data.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  };

  // Handle status filter change
  const handleStatusChange = (value) => {
    setStatusFilter(value);

    const filtered = data.filter((item) => {
      return value ? item.status.toLowerCase() === value.toLowerCase() : true;
    });

    setFilteredData(filtered);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const showModal = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "Admin" ? "blue" : "green"}>{role}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Active"
              ? "green"
              : status === "Inactive"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Engagement",
      dataIndex: "engagement",
      key: "engagement",
      render: (engagement) => <span>{engagement} purchases</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => showModal(record)}
          className="text-blue-600"
        >
          <FaEdit size={24} />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-start">User Management</h1>
      <div className="flex mb-5 items-center">
        <Input
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
          className=" mr-4 py-3 w-[50%]"
        />
        <Select
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={handleStatusChange}
          style={{ width: 150, height: 50 }}
        >
          <Option value="">All</Option>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical" initialValues={currentUser} onFinish={handleOk}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter the username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
