import React, { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom"

const InsertFormQLDA = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        setLoading(true);
        console.log('Success:', values);
        const formatValues = {
            ...values,
            timeStart: values.timeStart.format('YYYY-MM-DD'),
            timeEnd: values.timeEnd.format('YYYY-MM-DD'),
        }
        axios.post('/api/insertQLDA', formatValues).then(res => {
            message.success("Them thanh cong");
            setLoading(false)
            navigate("/QLDuAn");
        }).catch(error => {
            console.log(error);
            message("Them that bai!")
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const DateFormat = 'DD-MM-YYYY';
    return (
        <Form
            name="insert_qlda"
            labelCol={{
                span: 10,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                width: 800,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Tên dự án"
                name="projectName"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập tên dự án!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Thời gian bắt đầu"
                name="timeStart"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian bắt đầu!',
                    },
                ]}
            >
                <DatePicker format={DateFormat} />
            </Form.Item>

            <Form.Item
                label="Thời gian kết thúc"
                name="timeEnd"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian kết thúc!',
                    },
                ]}
            >
                <DatePicker format={DateFormat} />
            </Form.Item>

            <Form.Item
                labelCol={{ offset: 10, span: 12 }}
                wrapperCol={{
                    offset: 10,
                    span: 12,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thêm dự án
                </Button>

                <Button style={{ marginLeft: 10 }}>
                    <NavLink to={"/QLDuAn"}>Quay lại</NavLink>
                </Button>
            </Form.Item>
        </Form>
    );
}
export default InsertFormQLDA;