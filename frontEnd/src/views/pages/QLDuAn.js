import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import moment from 'moment';

const BangDuAn = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [projectData, setProjectData] = useState([]);
    const searchInput = useRef(null);

    useEffect(() => {
        axios.get('/api/project')
            .then(res => {
                const project = res.data;
                console.log('Project Data: ', project);
                setProjectData(project.project);
            })
            .catch(error => console.log('Error fetching project data:', error));
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

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
            key: 'STT',
            render: (text, record, index) => index + 1,
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
            title: 'Thời gian bắt đầu',
            dataIndex: 'time_start',
            key: 'time_start',
            render: (text) => moment(text).format('DD-MM-YYYY'),
            ...getColumnSearchProps('time_start', 'Thời gian bắt đầu'),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'time_end',
            key: 'time_end',
            render: (text) => moment(text).format('DD-MM-YYYY'),
            ...getColumnSearchProps('time_end', 'Thời gian kết thúc'),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <a href="#">Sửa</a>
                    <a href="#">Xóa</a>
                </Space>
            ),
        },
    ];


    return <Table columns={columns} dataSource={projectData} />;
};

export default BangDuAn;
