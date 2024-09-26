import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserTest from './EmailTest';
import axios from 'axios';
const DangNhap = ({ onLogin }) => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        let isUserValid = false;

        //Tien hanh dang nhap
        for (let i = 0; i < UserTest.length; i++) {
            if (UserTest[i].email === values.email && UserTest[i].password === values.password) {
                isUserValid = true;
                onLogin();
                navigate("/QLDuAn"); // Hien thi trang quan ly du an
                break;
            }
        }
        if (!isUserValid) {
            alert('Thông tin đăng nhập không chính xác');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    minWidth: 360,
                    background: '#f5f5f5',
                    borderRadius: '5px',
                    border: '1px solid #808080',
                    padding: '20px 10px',
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập Email của bạn',
                        },
                        {
                            type: 'email',
                            message: 'Hãy nhập địa chỉ Email hợp lệ'
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} type="text" placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập Password của bạn',
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Lưu đăng nhập</Checkbox>
                        </Form.Item>
                        <a href="">Quên mật khẩu</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>
                    Hoặc <a href="">Đăng ký ngay</a>
                </Form.Item>
            </Form>
        </div>
    );
};
export default DangNhap;