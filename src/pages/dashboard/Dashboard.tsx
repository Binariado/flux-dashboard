import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  SalesTrendChart,
  UserActivityChart,
  CategoryDistributionChart,
  ServerStatusChart,
} from '@/components/dashboard/charts';

const { Title } = Typography;

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        {t('pages.dashboard.title')}
      </Title>

      <Row gutter={[24, 24]}>
        {/* Top Row: Key Metrics Trends */}
        <Col xs={24} lg={16}>
          <SalesTrendChart />
        </Col>
        <Col xs={24} lg={8}>
          <ServerStatusChart />
        </Col>

        {/* Second Row: Activity and Distribution */}
        <Col xs={24} lg={12}>
          <UserActivityChart />
        </Col>
        <Col xs={24} lg={12}>
          <CategoryDistributionChart />
        </Col>
      </Row>
    </div>
  );
}
