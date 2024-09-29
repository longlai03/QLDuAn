import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom"
import moment from 'moment';
import dayjs from 'dayjs';

const UpdateFormQLDA = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const DateFormat = 'DD-MM-YYYY';


    // Lấy dữ liệu dự án để điền vào form
    useEffect(() => {
        setLoading(true);
        axios.get(`/api/updateQLDA/${projectId}`)
            .then(res => {
                const project = res.data.project[0];
                console.log(project);
                form.setFieldsValue({
                    projectName: project.project_name,
                    timeStart: dayjs(moment(project.time_start)),
                    timeEnd: dayjs(moment(project.time_end)),
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching project:', err);
                message.error('Lỗi khi lấy thông tin dự án!');
                setLoading(false);
            });
    }, [projectId, form]);

    const onFinish = (values) => {
        console.log('Success:', values);
        const formatValues = {
            ...values,
            timeStart: values.timeStart.format('YYYY-MM-DD'),
            timeEnd: values.timeEnd.format('YYYY-MM-DD'),
        };

        // Gửi dữ liệu cập nhật về server
        axios.post(`/api/updateQLDA/${projectId}`, formatValues)
            .then(() => {
                message.success("Cập nhật thành công!");
                navigate("/QLDuAn");
            })
            .catch(error => {
                console.error('Error updating project:', error);
                message.error('Cập nhật thất bại!');
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="update_qlda"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 800 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            loading={loading}
        >
            <Form.Item
                label="Tên dự án"
                name="projectName"
                rules={[
                    { required: true, message: 'Hãy nhập tên dự án!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Thời gian bắt đầu"
                name="timeStart"
                rules={[
                    { required: true, message: 'Hãy nhập thời gian bắt đầu!' },
                ]}
            >
                <DatePicker format={DateFormat} />
            </Form.Item>

            <Form.Item
                label="Thời gian kết thúc"
                name="timeEnd"
                rules={[
                    { required: true, message: 'Hãy nhập thời gian kết thúc!' },
                ]}
            >
                <DatePicker format={DateFormat} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Cập nhật dự án
                </Button>

                <Button style={{ marginLeft: 10 }}>
                    <NavLink to={"/QLDuAn"}>Quay lại</NavLink>
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateFormQLDA;
