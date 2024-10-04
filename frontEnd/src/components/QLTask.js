import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const BangTask = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [taskData, setTaskData] = useState([]);
    const searchInput = useRef(null);

    useEffect(() => {
        loadData();
    })
    const loadData = () => {
        axios.get('/api/task')
            .then(res => {
                const task = res.data;
                // console.log('task Data: ', task);
                // console.log('task Data Array: ', task.task);
                const task_list = task.task;
                formatDate(task_list);
                setTaskData(task_list);
            })
            .catch(error => console.log('Error fetching project data:', error));
    }

    const formatDate = (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i].plan_start_time = moment(array[i].plan_start_time).format('DD-MM-YYYY');
            array[i].plan_end_time = moment(array[i].plan_end_time).format('DD-MM-YYYY');
            array[i].actual_start_time = moment(array[i].actual_start_time).format('DD-MM-YYYY');
            array[i].actual_end_time = moment(array[i].actual_end_time).format('DD-MM-YYYY');
        }
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const handleDelete = (taskId) => {
        console.log("Deleting task ID:", taskId);
        axios.post(`/api/deleteQLTask/${taskId}`).then(() => {
            message.success("Xóa thành công!");
            loadData();
        }).catch(error => {
            console.error('Error deleting project:', error);
            message.error('Xóa thất bại!');
        });
    }
    const getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Làm mới
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (text, record, index) => {
                return index + 1;
            },
        },
        {
            title: 'Project ID',
            dataIndex: 'project_id',
            key: 'project_id',
            ...getColumnSearchProps('project_id', 'Project ID'),
        },
        {
            title: 'Project Name',
            dataIndex: 'project_name',
            key: 'project_name',
            ...getColumnSearchProps('project_name', 'Project Name'),
        },
        {
            title: 'Task Name',
            dataIndex: 'task_name',
            key: 'task_name',
            ...getColumnSearchProps('task_name', 'Task Name'),

        },
        {
            title: 'Plan Start Time',
            dataIndex: 'plan_start_time',
            key: 'plan_start_time',
            ...getColumnSearchProps('plan_start_time', 'Plan Start Time'),

        },
        {
            title: 'Plan End Time',
            dataIndex: 'plan_end_time',
            key: 'plan_end_time',
            ...getColumnSearchProps('plan_end_time', 'Plan End Time'),

        },
        {
            title: 'Actual Start Time',
            dataIndex: 'actual_start_time',
            key: 'actual_start_time',
            ...getColumnSearchProps('actual_start_time', 'Actual Start Time'),

        },
        {
            title: 'Actual End Time',
            dataIndex: 'actual_end_time',
            key: 'actual_end_time',
            ...getColumnSearchProps('actual_end_time', 'Actual End Time'),

        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status', 'Trạng thái'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <NavLink to={`/UpdateQLTask/${record.task_id}`}>Sửa</NavLink>
                    <NavLink onClick={() => handleDelete(record.task_id)}>Xóa</NavLink>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={taskData} />
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type='primary'
                >
                    <NavLink to={"/InsertQLTask"}>
                        Thêm
                    </NavLink>
                </Button>
            </div>
        </>
    );
};
export default BangTask;