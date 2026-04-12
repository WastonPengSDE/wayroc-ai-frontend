import Footer from '@/components/Footer';
import { register } from '@/services/wayroc/userController';

import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';

import { Helmet, history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkUserPassword } = values;
    
    if (userPassword !== checkUserPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      const res = await register(values);
      if (res?.data) {
        message.success('注册成功，请登录');
        history.push('/user/login');
        return;
      }
      message.error('注册失败');
    } catch (error) {
      console.error(error);
      message.error('注册失败，请重试');
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>Register - {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Wayroc BI"
          subTitle="Simple AI-powered BI dashboard"
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Account Register',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Username"
                rules={[
                  {
                    required: true,
                    message: 'Username is required',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Password"
                rules={[
                  {
                    required: true,
                    message: 'Password is required',
                  },
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkUserPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/login">Already have an account? Login</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
