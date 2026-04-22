import { Button, Card, Col, Input, Modal, Popconfirm, Row, Table, Tooltip, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import FormQuanLyPhongHoc from './Form';

const QuanLyPhongHoc = () => {
  const { data, getData, setRow, isEdit, setVisible, setIsEdit, visible, deleteRecord } = useModel('quanlyphonghoc');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (record: QuanLyPhongHoc.Record) => {
    if (record.soChoNgoi >= 30) {
      message.error('Chỉ cho phép xóa phòng dưới 30 chỗ ngồi!');
      return;
    }
    deleteRecord(record._id);
  };

  const filteredData = data.filter((item) => {
    const text = searchText.toLowerCase();
    return item.maPhong.toLowerCase().includes(text) || item.tenPhong.toLowerCase().includes(text);
  });

  const columns = [
    {
      title: 'Mã phòng',
      dataIndex: 'maPhong',
      key: 'maPhong',
      width: 120,
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'soChoNgoi',
      key: 'soChoNgoi',
      width: 150,
      sorter: (a: QuanLyPhongHoc.Record, b: QuanLyPhongHoc.Record) => a.soChoNgoi - b.soChoNgoi,
    },
    {
      title: 'Loại phòng',
      dataIndex: 'loaiPhong',
      key: 'loaiPhong',
      width: 150,
      filters: [
        { text: 'Lý thuyết', value: 'Lý thuyết' },
        { text: 'Thực hành', value: 'Thực hành' },
        { text: 'Hội trường', value: 'Hội trường' },
      ],
      onFilter: (value: any, record: QuanLyPhongHoc.Record) => record.loaiPhong === value,
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'nguoiPhuTrach',
      key: 'nguoiPhuTrach',
      width: 200,
      filters: [
        { text: 'Phan Văn Nam', value: 'Phan Văn Nam' },
        { text: 'Đỗ Gia Bách', value: 'Đỗ Gia Bách' },
        { text: 'Hoàng Ngọc Liên', value: 'Hoàng Ngọc Liên' },
        { text: 'Vũ Thị Diệu Linh', value: 'Vũ Thị Diệu Linh' },
      ],
      onFilter: (value: any, record: QuanLyPhongHoc.Record) => record.nguoiPhuTrach === value,
    },
    {
      title: 'Thao tác',
      width: 120,
      align: 'center' as const,
      render: (record: QuanLyPhongHoc.Record) => {
        return (
          <Space>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="small"
                onClick={() => {
                  setRow(record);
                  setIsEdit(true);
                  setVisible(true);
                }}
              />
            </Tooltip>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa phòng học này?"
              onConfirm={() => handleDelete(record)}
              okText="Có"
              cancelText="Không"
            >
              <Tooltip title="Xóa">
                <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Card title="Quản lý phòng học">
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input
            placeholder="Tìm kiếm theo mã phòng, tên phòng"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setVisible(true);
              setIsEdit(false);
              setRow(undefined);
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        destroyOnClose
        footer={null}
        title={isEdit ? 'Chỉnh sửa phòng học' : 'Thêm mới phòng học'}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <FormQuanLyPhongHoc />
      </Modal>
    </Card>
  );
};

export default QuanLyPhongHoc;
