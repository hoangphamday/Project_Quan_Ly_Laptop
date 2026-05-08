import React, { useState } from 'react';
import { Form, Input, Button, message, Alert, Card, Typography, Select } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../app/AuthContext';

const { Title, Text } = Typography;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [form] = Form.useForm();

  const handleAuth = async (values: any) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (isRegister) {
        // Gọi API đăng ký
        await authService.register(values.username, values.password, values.role);
        message.success('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsRegister(false);
        form.resetFields();
      } else {
        // Đăng nhập
        const userData = await authService.login(values.username, values.password);

        if (userData && userData.token) {
          login(userData);
          message.success(`Đăng nhập thành công! Chào ${userData.tenDangNhap}`);

          // Điều hướng dựa vào Role từ BE trả về
          const userRole = userData.role || 'KhachHang';
          if (userRole === 'Admin' || userRole === 'NhanVien') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      }
    } catch (error: any) {
      if (error?.response?.status >= 500 || error?.response?.status === 404) {
        setErrorMsg('❌ Không thể kết nối đến Backend hoặc Server đang lỗi. Hãy kiểm tra lại Backend (Port đang dùng).');
      } else if (error?.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else if (!error?.response) {
        setErrorMsg('❌ Không kết nối được tới server. (Vite Proxy lỗi hoặc Backend chưa bật)');
      } else {
        setErrorMsg(isRegister ? 'Đăng ký thất bại!' : 'Tài khoản hoặc mật khẩu không chính xác!');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setErrorMsg(null);
    form.resetFields();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border-0 overflow-hidden">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto mx-auto mb-4 cursor-pointer"
            onClick={() => navigate('/')}
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
          />
          <Title level={3} className="!mb-1 text-slate-800">
            {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
          </Title>
          <Text className="text-slate-500">
            {isRegister ? 'Tạo tài khoản mới để tiếp tục' : 'Chào mừng bạn quay lại hệ thống'}
          </Text>
        </div>

        {errorMsg && (
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMsg(null)}
            className="mb-6 rounded-xl text-sm"
          />
        )}

        <Form
          form={form}
          name="auth_form"
          layout="vertical"
          onFinish={handleAuth}
          size="large"
          requiredMark={false}
          initialValues={{ role: 'KhachHang' }}
        >
          <Form.Item
            name="username"
            label={<span className="text-slate-600 font-medium h-auto">Tên đăng nhập</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined className="text-slate-400" />}
              placeholder="Nhập tên đăng nhập"
              className="rounded-lg h-11"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="text-slate-600 font-medium h-auto">Mật khẩu</span>}
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="Nhập mật khẩu"
              className="rounded-lg h-11"
            />
          </Form.Item>

          {isRegister && (
            <Form.Item
              name="role"
              label={<span className="text-slate-600 font-medium h-auto">Bạn là:</span>}
              rules={[{ required: true, message: 'Vui lòng chọn loại tài khoản!' }]}
            >
              <Select className="h-11">
                <Select.Option value="KhachHang">Khách hàng</Select.Option>
                <Select.Option value="NhanVien">Nhân viên</Select.Option>
                <Select.Option value="Admin">Quản trị viên</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item className="mt-8 mb-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-sm text-slate-500 mt-4">
          {isRegister ? (
            <span>
              Đã có tài khoản?{' '}
              <button 
                type="button" 
                onClick={toggleMode} 
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer bg-transparent border-none p-0"
              >
                Đăng nhập
              </button>
            </span>
          ) : (
            <span>
              Chưa có tài khoản?{' '}
              <button 
                type="button" 
                onClick={toggleMode} 
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer bg-transparent border-none p-0"
              >
                Đăng ký ngay
              </button>
            </span>
          )}
        </div>
      </Card>
      
      <div className="fixed bottom-4 text-center w-full text-slate-400 text-xs px-4 pointer-events-none">
        Nếu không kết nối được, hãy đảm bảo Backend đang bật đúng Port (ví dụ: https://localhost:7181)
      </div>
    </div>
  );
};
