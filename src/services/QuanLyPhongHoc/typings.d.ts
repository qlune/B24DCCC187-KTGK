declare namespace QuanLyPhongHoc {
  type Record = {
    _id: string;
    maPhong: string;
    tenPhong: string;
    soChoNgoi: number;
    loaiPhong: 'Lý thuyết' | 'Thực hành' | 'Hội trường';
    nguoiPhuTrach: string;
  };
}
