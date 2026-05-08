// ============================
// TypeScript Types - khớp với Models C# bên BE
// ============================

export interface TaiKhoan {
  maTK?: string;
  tenDangNhap: string;
  matKhau: string;
  role?: string;       // C# Model: Role (not VaiTro)
  trangThai?: boolean;
  ngayTao?: string;
  token?: string;
  fullName?: string;
  maKH?: string;
}

export interface Laptop {
  maLaptop: string;
  tenLaptop: string;
  maHang: string;
  cpu: string;
  ram: string;
  ssd: string;
  gpu: string;
  manHinh: string;
  gia: number;
  soLuong: number;
  baoHanh: number;
  moTa: string;
  ngayThem?: string;
  // Ảnh đại diện – lấy từ bảng HinhAnhLaptop (JOIN trong proc)
  duongDanAnh?: string;
}

export interface NhaCungCap {
  maNCC: string;
  tenNCC: string;
  dienThoai: string;
  email: string;
  diaChi: string;
}

export interface KhachHang {
  maKH: string;
  tenKH: string;
  dienThoai: string;
  email: string;
  diaChi: string;
  ngayDangKy?: string;
  maTK?: string;
}

export interface DonHang {
  maDonHang: string;
  maKH: string;
  maNV?: string;
  ngayDat: string;
  tongTien: number;
  trangThai: string;
  diaChiGiaoHang: string;
  phuongThucThanhToan: string;
  ghiChu?: string;
}

export interface ChiTietDonHang {
  maCTDH?: string;
  maDonHang: string;
  maLaptop: string;
  soLuong: number;
  donGia: number;
  khuyenMai?: number;
  thanhTien: number;
}

export interface ThongKeDoanhThu {
  thang: number;
  nam: number;
  tongDoanhThu: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
}

// ====== PHIẾU NHẬP ======

export interface PhieuNhapViewModel {
  maPhieuNhap: string;
  ngayNhap: string;
  tongTien: number;
  ghiChu?: string;
  tenNCC: string;
  tenNV: string;
  tongSoLuongSP: number;
}

export interface ChiTietPhieuNhapViewModel {
  maCTPN: string;
  maLaptop: string;
  tenLaptop: string;
  cpu: string;
  ram: string;
  ssd: string;
  soLuong: number;
  giaNhap: number;
  thanhTien: number;
}

