import Footer from '@/components/Footer';
// ✅ 只保留 login
import { login } from '@/services/wayroc/userController';

import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';

import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

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

const handleSubmit = async (values: API.UserLoginRequest) => {
  try {
    const userInfo = await login(values as API.UserLoginRequest);
    console.log('login response ===>', userInfo);

    // 根据返回的用户对象判断是否成功
    if (userInfo && userInfo.id) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
          settings: s?.settings ?? {},
        }));
      });

      message.success('Login successful');

      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/add_chart');
      return;
    }

    // 如果后端返回 null / undefined / 空对象，就认为登录失败
    message.error('Login failed, invalid username or password');
  } catch (error) {
    console.error(error);
    message.error('Login failed, please try again');
  }
};


  return (
    <div className={containerClassName}>
      <Helmet>
        <title>Login - {Settings.title}</title>
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
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Account Login',
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
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/register">Register</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
