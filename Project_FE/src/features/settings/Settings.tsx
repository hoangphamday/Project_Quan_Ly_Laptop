import React from 'react';
import { Card, Tabs, Form, Input, Button, Switch, Divider, Typography, Row, Col, Select } from 'antd';
import { SaveOutlined, ShopOutlined, SafetyCertificateOutlined, NotificationOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const Settings: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Title level={4} style={{ margin: 0, color: '#0f172a' }}>Cài đặt hệ thống</Title>
        <Text className="text-slate-500">Quản lý cấu hình cửa hàng của bạn</Text>
      </div>

      <Card bordered={false} className="shadow-sm rounded-xl">
        <Tabs 
          tabPosition="left"
          items={[
            {
              key: '1',
              label: <span className="flex items-center gap-2 pr-4"><ShopOutlined /> Chung</span>,
              children: (
                <div className="px-6 py-2">
                  <h3 className="text-lg font-bold mb-6 text-slate-800">Thông tin cửa hàng</h3>
                  <Form form={form} layout="vertical" initialValues={{ name: 'TechSpace', email: 'contact@techspace.vn', currency: 'VND' }}>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item label="Tên cửa hàng" name="name">
                          <Input size="large" className="rounded-lg hover:border-blue-400 focus:border-blue-500" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Email liên hệ" name="email">
                          <Input size="large" className="rounded-lg hover:border-blue-400 focus:border-blue-500" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Số điện thoại CSKH">
                          <Input size="large" className="rounded-lg hover:border-blue-400 focus:border-blue-500" placeholder="1900 xxxx" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Đơn vị tiền tệ" name="currency">
                          <Select size="large" className="rounded-lg">
                            <Select.Option value="VND">VND (₫)</Select.Option>
                            <Select.Option value="USD">USD ($)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Địa chỉ cửa hàng chính">
                          <Input.TextArea rows={3} className="rounded-lg hover:border-blue-400 focus:border-blue-500" placeholder="Nhập địa chỉ..." />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Divider />
                    <Button type="primary" size="large" icon={<SaveOutlined />} className="bg-blue-600 rounded-lg hover:bg-blue-700">Lưu thay đổi</Button>
                  </Form>
                </div>
              )
            },
            {
              key: '2',
              label: <span className="flex items-center gap-2 pr-4"><NotificationOutlined /> Thông báo</span>,
              children: (
                <div className="px-6 py-2">
                  <h3 className="text-lg font-bold mb-6 text-slate-800">Cài đặt thông báo & Email</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Email khi có đơn hàng mới</div>
                        <div className="text-sm text-slate-500">Nhận email ngay khi khách đặt hàng thành công</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Divider className="my-0" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Email báo cáo doanh thu</div>
                        <div className="text-sm text-slate-500">Gửi mail báo cáo tổng kết hàng tuần</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Divider className="my-0" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Thông báo hết hàng</div>
                        <div className="text-sm text-slate-500">Cảnh báo khi sản phẩm trong kho dưới 5 cái</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              )
            },
            {
              key: '3',
              label: <span className="flex items-center gap-2 pr-4"><SafetyCertificateOutlined /> Bảo mật</span>,
              children: (
                <div className="px-6 py-2">
                  <h3 className="text-lg font-bold mb-6 text-slate-800">Bảo mật tài khoản</h3>
                  <Button size="large" className="rounded-lg mb-4 hover:border-blue-400 hover:text-blue-500">Đổi mật khẩu</Button>
                  <p className="text-sm text-slate-500 mt-2">Đăng nhập lần cuối: Hôm nay lúc 09:41</p>
                </div>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};
