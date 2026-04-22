import { useState } from 'react';
import { message } from 'antd';

export default () => {
  const [data, setData] = useState<QuanLyPhongHoc.Record[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<QuanLyPhongHoc.Record>();

  const getData = () => {
    const dataLocal = JSON.parse(localStorage.getItem('quanLyPhongHoc_data') || '[]');
    if (dataLocal.length === 0) {
      const initialData: QuanLyPhongHoc.Record[] = [
        {
          _id: '1',
          maPhong: 'P101',
          tenPhong: 'Phòng 101 A2',
          soChoNgoi: 50,
          loaiPhong: 'Lý thuyết',
          nguoiPhuTrach: 'Đỗ Gia Bách',
        },
        {
          _id: '2',
          maPhong: 'P202',
          tenPhong: 'Phòng 202 Lab',
          soChoNgoi: 20,
          loaiPhong: 'Thực hành',
          nguoiPhuTrach: 'Vũ Thị Diệu Linh',
        },
        {
          _id: '3',
          maPhong: 'HT1',
          tenPhong: 'Hội trường lớn',
          soChoNgoi: 200,
          loaiPhong: 'Hội trường',
          nguoiPhuTrach: 'Phan Văn Nam',
        },
      ];
      localStorage.setItem('quanLyPhongHoc_data', JSON.stringify(initialData));
      setData(initialData);
    } else {
      setData(dataLocal);
    }
  };

  const deleteRecord = (id: string) => {
    const dataLocal: QuanLyPhongHoc.Record[] = JSON.parse(localStorage.getItem('quanLyPhongHoc_data') || '[]');
    const newData = dataLocal.filter((item) => item._id !== id);
    localStorage.setItem('quanLyPhongHoc_data', JSON.stringify(newData));
    getData();
    message.success('Xóa phòng học thành công');
  };

  const saveRecord = (values: QuanLyPhongHoc.Record) => {
    const dataLocal: QuanLyPhongHoc.Record[] = JSON.parse(localStorage.getItem('quanLyPhongHoc_data') || '[]');
    if (isEdit && row) {
      const index = dataLocal.findIndex((item) => item._id === row._id);
      if (index !== -1) {
        dataLocal[index] = { ...values, _id: row._id };
        localStorage.setItem('quanLyPhongHoc_data', JSON.stringify(dataLocal));
        message.success('Cập nhật phòng học thành công');
      }
    } else {
      const newRecord = { ...values, _id: Math.random().toString(36).substring(7) };
      dataLocal.push(newRecord);
      localStorage.setItem('quanLyPhongHoc_data', JSON.stringify(dataLocal));
      message.success('Thêm phòng học thành công');
    }
    setVisible(false);
    getData();
  };

  return {
    data,
    visible,
    setVisible,
    row,
    setRow,
    isEdit,
    setIsEdit,
    getData,
    deleteRecord,
    saveRecord,
  };
};
