import { Typography } from 'antd';
import type { ApexOptions } from 'apexcharts';
import Chart, { type Props as ApexChartsProps } from 'react-apexcharts';
import { Link, type LinkProps } from 'react-router';
import { Card, Flex } from '@/components/ui';

const { Text } = Typography;

interface ChartsProps {
  cardTitle?: string;
  link?: string;
  state?: LinkProps['state'];
  chartHeight?: string | number;
  chartWidth?: string | number;
  chartOption?: ApexOptions;
  chartType?: ApexChartsProps['type'];
  chartSeries?: ApexOptions['series'];
  loading?: boolean;
}

const calculateTotal = (series: ApexOptions['series'] = []): number => {
  if (!series) return 0;

  let total = 0;

  for (const s of series) {
    if (typeof s === 'number') {
      // Simple number (Pie/Donut/Radial)
      total += s;
    } else if (typeof s === 'object' && s !== null && 'data' in s) {
      // Series object ({ name: '', data: [] })
      const data = s.data;
      if (Array.isArray(data)) {
        for (const d of data) {
          if (typeof d === 'number') {
            total += d;
          } else if (d && typeof d === 'object') {
            // Object format { x: ..., y: ... }
            if ('y' in d && typeof d.y === 'number') {
              total += d.y;
            }
            // Array format [x, y]
            else if (Array.isArray(d) && d.length > 1 && typeof d[1] === 'number') {
              total += d[1];
            }
          }
        }
      }
    }
  }
  return total;
};

export const LinkCharts = ({
  link,
  chartHeight = 350,
  chartWidth = '100%',
  chartOption = {},
  chartSeries = [],
  chartType = 'line',
  cardTitle,
  loading = false,
  state,
}: ChartsProps) => {
  const total = calculateTotal(chartSeries);

  const Content = (
    <Card title={cardTitle} loading={loading} className="h-full hover:shadow-md transition-shadow">
      <div className="w-full">
        <Chart
          options={chartOption}
          series={chartSeries}
          type={chartType}
          height={chartHeight}
          width={chartWidth}
        />
      </div>
      <Flex justify="flex-end" className="mt-4">
        <Text strong className="text-lg">
          Total: {total.toLocaleString()}
        </Text>
      </Flex>
    </Card>
  );

  if (link) {
    return (
      <Link to={link} state={state} className="block h-full">
        {Content}
      </Link>
    );
  }

  return Content;
};

export const ChartDetail = ({
  chartHeight = 350,
  chartWidth = '100%',
  chartOption = {},
  chartSeries = [],
  chartType = 'line',
  cardTitle,
  loading = false,
}: ChartsProps) => {
  const total = calculateTotal(chartSeries);

  return (
    <Card title={cardTitle} loading={loading} className="h-full">
      <div className="w-full">
        <Chart
          options={chartOption}
          series={chartSeries}
          type={chartType}
          height={chartHeight}
          width={chartWidth}
        />
      </div>
      <Flex justify="flex-end" className="mt-4">
        <Text strong className="text-lg">
          Total: {total.toLocaleString()}
        </Text>
      </Flex>
    </Card>
  );
};
