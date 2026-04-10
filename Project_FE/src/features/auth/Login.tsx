import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        if (values.username === 'admin' && values.password === '12345') {
          message.success('Đăng nhập thành công!');
          navigate('/admin');
        } else {
          message.error('Tài khoản hoặc mật khẩu không chính xác!');
        }
      } else {
        message.success('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        setIsLogin(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 font-sans p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-12 w-auto mx-auto mb-4 cursor-pointer" 
            onClick={() => navigate('/')} 
          />
          <h2 className="text-2xl font-bold text-slate-800">
            {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            {isLogin ? 'Chào mừng bạn quay lại hệ thống' : 'Tạo tài khoản để trải nghiệm tốt hơn'}
          </p>
        </div>

        {/* Form */}
        <Form
          name="auth_form"
          layout="vertical"
          onFinish={onFinish}
          size="large"
          requiredMark={false}
        >
          {!isLogin && (
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-slate-400 mr-2" />} 
                placeholder="Họ và tên" 
                className="h-12 rounded-lg"
              />
            </Form.Item>
          )}

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input 
              prefix={<MailOutlined className="text-slate-400 mr-2" />} 
              placeholder={isLogin ? "Tên đăng nhập / Email (VD: admin)" : "Email"} 
              className="h-12 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-slate-400 mr-2" />}
              placeholder="Mật khẩu (VD: 12345)" 
              className="h-12 rounded-lg"
            />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="text-slate-400 mr-2" />}
                placeholder="Xác nhận mật khẩu" 
                className="h-12 rounded-lg"
              />
            </Form.Item>
          )}

          {isLogin && (
            <div className="flex items-center justify-between mb-6">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-slate-600">Ghi nhớ tôi</Checkbox>
              </Form.Item>
              <a className="text-blue-600 hover:text-blue-500 font-medium text-sm" href="#">
                Quên mật khẩu?
              </a>
            </div>
          )}

          <Form.Item className={!isLogin ? "mt-6 mb-4" : "mb-4"}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <span className="text-slate-600 text-sm">
              {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            </span>
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-600 font-semibold hover:text-blue-500 border-none bg-transparent cursor-pointer"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </div>
        </Form>
        
      </div>
    </div>
  );
};
