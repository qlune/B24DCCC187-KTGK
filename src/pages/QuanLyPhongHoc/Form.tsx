import { Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const FormQuanLyPhongHoc = () => {
  const [form] = Form.useForm();
  const { data, isEdit, row, saveRecord, setVisible } = useModel('quanlyphonghoc');

  useEffect(() => {
    if (isEdit && row) {
      form.setFieldsValue(row);
    } else {
      form.resetFields();
    }
  }, [isEdit, row, form]);

  const onFinish = (values: any) => {
    saveRecord(values);
  };

  const checkUnique = (field: 'maPhong' | 'tenPhong', value: string) => {
    if (!value) return Promise.resolve();
    const isDuplicate = data.some(
      (item) => item[field].toLowerCase() === value.toLowerCase() && (!isEdit || item._id !== row?._id)
    );
    if (isDuplicate) {
      return Promise.reject(new Error(`${field === 'maPhong' ? 'Mã' : 'Tên'} phòng đã tồn tại!`));
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
    >
      <Form.Item
        name='maPhong'
        label='Mã phòng'
        rules={[
          { required: true, message: 'Vui lòng nhập mã phòng!' },
          { max: 10, message: 'Mã phòng tối đa 10 ký tự!' },
          { validator: (_, value) => checkUnique('maPhong', value) }
        ]}
      >
        <Input placeholder='Nhập mã phòng' />
      </Form.Item>

      <Form.Item
        name='tenPhong'
        label='Tên phòng'
        rules={[
          { required: true, message: 'Vui lòng nhập tên phòng!' },
          { max: 50, message: 'Tên phòng tối đa 50 ký tự!' },
          { validator: (_, value) => checkUnique('tenPhong', value) }
        ]}
      >
        <Input placeholder='Nhập tên phòng' />
      </Form.Item>

      <Form.Item
        name='soChoNgoi'
        label='Số chỗ ngồi'
        rules={[
          { required: true, message: 'Vui lòng nhập số chỗ ngồi!' },
          { type: 'number', min: 10, max: 200, message: 'Số chỗ ngồi từ 10 đến 200!' }
        ]}
      >
        <InputNumber style={{ width: '100%' }} placeholder='Nhập số chỗ ngồi' />
      </Form.Item>

      <Form.Item
        name='loaiPhong'
        label='Loại phòng'
        rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
      >
        <Select placeholder='Chọn loại phòng'>
          <Select.Option value='Lý thuyết'>Lý thuyết</Select.Option>
          <Select.Option value='Thực hành'>Thực hành</Select.Option>
          <Select.Option value='Hội trường'>Hội trường</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='nguoiPhuTrach'
        label='Người phụ trách'
        rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
      >
        <Select placeholder='Chọn người phụ trách'>
          <Select.Option value='Phan Văn Nam'>Phan Văn Nam</Select.Option>
          <Select.Option value='Đỗ Gia Bách'>Đỗ Gia Bách</Select.Option>
          <Select.Option value='Hoàng Ngọc Liên'>Hoàng Ngọc Liên</Select.Option>
          <Select.Option value='Vũ Thị Diệu Linh'>Vũ Thị Diệu Linh</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
        <Space>
          <Button onClick={() => setVisible(false)}>Hủy</Button>
          <Button type='primary' htmlType='submit'>
            Lưu
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FormQuanLyPhongHoc;
