import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
const DangNhap = ({ onLogin }) => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        //Dieu kien dang nhap thanh cong...


        onLogin();
        navigate("/"); // Hien thi trang quan ly du an
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    minWidth: 360,
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
                    ]}
                >
                    <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
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