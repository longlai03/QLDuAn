import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom"
import dayjs from 'dayjs';
import moment from 'moment';

const UpdateFormQLTask = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [loading, setLoading] = useState(false);
    const [projectName, setProjectName] = useState([]);
    const DateFormat = 'DD-MM-YYYY';

    // Lấy dữ liệu dự án để điền vào form
    useEffect(() => {
        setLoading(true);
        axios.get(`/api/updateQLTask/${taskId}`)
            .then(res => {
                const taskData = res.data.task[0];
                console.log("taskData: ", taskData);
                const projectData = taskData.project_name;
                setProjectName(projectData);
                form.setFieldsValue({
                    projectName: taskData.project_name,
                    taskName: taskData.task_name,
                    planStartTime: dayjs(moment(taskData.plan_start_time)),
                    planEndTime: dayjs(moment(taskData.plan_end_time)),
                    actualStartTime: dayjs(moment(taskData.actual_start_time)),
                    actualEndTime: dayjs(moment(taskData.actual_end_time)),
                    status: taskData.status,
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching project:', err);
                message.error('Lỗi khi lấy thông tin dự án!');
                setLoading(false);
            });
    }, [taskId, form]);

    const onFinish = (values) => {
        console.log('Success:', values);
        const formatValues = {
            ...values,
            planStartTime: values.planStartTime.format('YYYY-MM-DD'),
            planEndTime: values.planEndTime.format('YYYY-MM-DD'),
            actualStartTime: values.actualStartTime.format('YYYY-MM-DD'),
            actualEndTime: values.actualEndTime.format('YYYY-MM-DD'),
        };

        // Gửi dữ liệu cập nhật về server
        axios.post(`/api/updateQLTask/${taskId}`, formatValues)
            .then(() => {
                message.success("Cập nhật thành công!");
                navigate("/QLTask");
            })
            .catch(error => {
                console.error('Error updating project:', error);
                message.error('Cập nhật thất bại!');
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

    return (
        <Form
            form={form}
            name="update_qltask"
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
            loading={loading}
        >
            <Form.Item
                label="Tên Dự án"
                name="projectName"
                rules={[
                    {
                        required: true,
                        message: 'Hãy chọn dự án!',
                    },
                ]}
            >
                <Select value={projectName} disabled />
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
                    Cập nhật Task
                </Button>

                <Button style={{ marginLeft: 10 }}>
                    <NavLink style={{ textDecoration: 'none' }} to={"/QLTask"}>Quay lại</NavLink>
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateFormQLTask;
