import { getChart } from '@/services/wayroc/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Spin, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

/**
 * Add Chart Page
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<any>();
  const [option, setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  /**
   * Submit form
   */
  const onFinish = async (values: any) => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setChart(undefined);
    setOption(undefined);

    const params = {
      ...values,
      file: undefined,
    };

    try {
      const res = await getChart(
        params,
        values.file?.file
      ); // tbd genChart. by ai

      if (!res?.data) {
        message.error('Analysis failed');
      } else {
        message.success('Analysis succeeded');
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption) {
          throw new Error('Failed to parse chart config');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('Analysis failed: ' + (e?.message || 'unknown error'));
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Smart Analysis">
            <Form
              name="addChart"
              labelAlign="left"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              initialValues={{}}
            >
              <Form.Item
                name="goal"
                label="Goal"
                rules={[{ required: true, message: 'Please enter your analysis goal' }]}
              >
                <TextArea
                  placeholder="Example: Analyze the trend of website user growth"
                  rows={4}
                />
              </Form.Item>

              <Form.Item name="name" label="Chart Name">
                <Input placeholder="Optional: e.g. User Growth Trend" />
              </Form.Item>

              <Form.Item name="chartType" label="Chart Type">
                <Select
                  allowClear
                  placeholder="Optional: Let AI decide if empty"
                  options={[
                    { value: 'line', label: 'Line Chart' },
                    { value: 'bar', label: 'Bar Chart' },
                    { value: 'stack', label: 'Stacked Bar Chart' },
                    { value: 'pie', label: 'Pie Chart' },
                    { value: 'radar', label: 'Radar Chart' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="file"
                label="Data File"
                rules={[{ required: true, message: 'Please upload a CSV file' }]}
              >
                <Upload name="file" maxCount={1} accept=".csv,.xls,.xlsx">
                  <Button icon={<UploadOutlined />}>Upload CSV / Excel</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 5 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    Start Analysis
                  </Button>
                  <Button htmlType="reset" disabled={submitting}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="AI Summary">
            <Spin spinning={submitting}>
              <div style={{ minHeight: 80 }}>
                {chart?.genResult || 'Please submit your data on the left.'}
              </div>
            </Spin>
          </Card>

          <Divider />

          <Card title="Visualization">
            <Spin spinning={submitting}>
              <div style={{ minHeight: 300 }}>
                {option ? (
                  <ReactECharts option={option} />
                ) : (
                  <div>Please submit your data on the left.</div>
                )}
              </div>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddChart;
