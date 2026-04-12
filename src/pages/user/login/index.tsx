import Footer from '@/components/Footer';
import { JWT_KEY, JWT_USER_KEY } from '@/requestErrorConfig';
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
      const res = (await login(values as API.UserLoginRequest)) as { data?: { token?: string; user?: { id?: number; userAccount?: string } }; message?: string };
      const data = res?.data;
      if (data?.token && data?.user?.id) {
        localStorage.setItem(JWT_KEY, data.token);
        localStorage.setItem(JWT_USER_KEY, JSON.stringify(data.user));
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: { ...data.user, name: data.user!.userAccount } as API.CurrentUser,
            settings: s?.settings ?? {},
          }));
        });
        message.success('登录成功');
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/add_chart');
        return;
      }
      message.error(res?.message || '登录失败');
    } catch (error) {
      console.error(error);
      message.error('登录失败，请重试');
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
