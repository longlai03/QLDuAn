import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom"

const InsertFormQLTask = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [projectName, setProjectName] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get("/api/project").then(res => {
            const data = res.data.project;
            const projectData = data.map((item) => {
                return (
                    {
                        value: item.project_id,
                        label: item.project_name,
                    }
                )
            });
            setProjectName(projectData);
            console.log("projectData", projectData)
            setLoading(false);
        }).catch(err => {
            console.error('Error fetching project:', err);
            message.error('Lỗi khi lấy thông tin dự án!');
            setLoading(false);
        });
    }, [])
    const onFinish = (values) => {
        setLoading(true);
        console.log('Success:', values);
        const formatValues = {
            ...values,
            planStartTime: values.planStartTime.format('YYYY-MM-DD'),
            planEndTime: values.planEndTime.format('YYYY-MM-DD'),
            actualStartTime: values.actualStartTime.format('YYYY-MM-DD'),
            actualEndTime: values.actualEndTime.format('YYYY-MM-DD'),
        }
        axios.post('/api/insertQLTask', formatValues).then(res => {
            message.success("Them thanh cong");
            setLoading(false)
            navigate("/QLTask");
        }).catch(error => {
            console.log(error);
            message("Them that bai!")
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const StatusOption = [
        {
            value: "notYetStart",
            label: "Not Yet Start",
        },
        {
            value: "doing",
            label: "Doing",
        },
        {
            value: "done",
            label: "Done",
        },
    ]

    const DateFormat = 'DD-MM-YYYY';
    return (
        <Form
            name="insert_qltask"
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
                label="Dự án"
                name="projectId"
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn dự án!',
                    },
                ]}
            >
                <Select placeholder="Chọn dự án" options={projectName} />
            </Form.Item>
            <Form.Item
                label="Tên Task"
                name="taskName"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập tên Task!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Thời gian dự định bắt đầu"
                name="planStartTime"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian bắt đầu!',
                    },
                ]}
            >
                <DatePicker placeholder="Chọn thời gian" format={DateFormat} />
            </Form.Item>

            <Form.Item
                label="Thời gian dự định kết thúc"
                name="planEndTime"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian kết thúc!',
                    },
                ]}
            >
                <DatePicker placeholder="Chọn thời gian" format={DateFormat} />
            </Form.Item>

            <Form.Item
                label="Thời gian thực tế bắt đầu"
                name="actualStartTime"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian bắt đầu!',
                    },
                ]}
            >
                <DatePicker placeholder="Chọn thời gian" format={DateFormat} />
            </Form.Item>

            <Form.Item
                label="Thời gian thực tế kết thúc"
                name="actualEndTime"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian kết thúc!',
                    },
                ]}
            >
                <DatePicker placeholder="Chọn thời gian" format={DateFormat} />
            </Form.Item>

            <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập thời gian kết thúc!',
                    },
                ]}
            >
                <Select placeholder="Chọn trạng thái" options={StatusOption} />
            </Form.Item>

            <Form.Item
                labelCol={{ offset: 10, span: 12 }}
                wrapperCol={{
                    offset: 10,
                    span: 12,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thêm Task
                </Button>

                <Button style={{ marginLeft: 10 }}>
                    <NavLink style={{ textDecoration: 'none' }} to={"/QLTask"}>Quay lại</NavLink>
                </Button>
            </Form.Item>
        </Form>
    );
}
export default InsertFormQLTask;