
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const data = [
    {
        key: '1',
        STT: 1,
        ProjectID: '1',
        TaskName: 'abc',
        PlanStartTime: '1-1-2002',
        PlanEndTime: '2-2-2003',
        ActualStartTime: '2-1-2002',
        ActualEndTime: '2-2-2003',
        Status: 'OK',
    }
];
const BangTask = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
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
            dataIndex: 'STT',
            key: 'STT',
            ...getColumnSearchProps('STT', 'STT'),
        },
        {
            title: 'Project ID',
            dataIndex: 'ProjectID',
            key: 'ProjectID',
            ...getColumnSearchProps('ProjectID', 'Project ID'),
        },
        {
            title: 'Task Name',
            dataIndex: 'TaskName',
            key: 'TaskName',
            ...getColumnSearchProps('TaskName', 'Task Name'),

        },
        {
            title: 'Plan Start Time',
            dataIndex: 'PlanStartTime',
            key: 'PlanStartTime',
            ...getColumnSearchProps('PlanStartTime', 'Plan Start Time'),

        },
        {
            title: 'Plan End Time',
            dataIndex: 'PlanEndTime',
            key: 'PlanEndTime',
            ...getColumnSearchProps('PlanEndTime', 'Plan End Time'),

        },
        {
            title: 'Actual Start Time',
            dataIndex: 'ActualStartTime',
            key: 'ActualStartTime',
            ...getColumnSearchProps('ActualStartTime', 'Actual Start Time'),

        },
        {
            title: 'Actual End Time',
            dataIndex: 'ActualEndTime',
            key: 'ActualEndTime',
            ...getColumnSearchProps('ActualEndTime', 'Actual End Time'),

        },
        {
            title: 'Trạng thái',
            dataIndex: 'Status',
            key: 'Status',
            ...getColumnSearchProps('Status', 'Trạng thái'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Sửa {record.name}</a>
                    <a>Xóa</a>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data} />;
};
export default BangTask;