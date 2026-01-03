import { ChartDetail } from '@/components/ui/chart/charts';
import type { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const CategoryDistributionChart = () => {
  const { t } = useTranslation();

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: 'category-distribution',
      },
      labels: t('pages.dashboard.charts.categoryDistribution.categories', {
        returnObjects: true,
      }) as string[],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
          },
        },
      },
      legend: {
        position: 'bottom',
      },
      dataLabels: { enabled: false },
      tooltip: {
        theme: 'dark',
      },
    }),
    [t],
  );

  const series = [44, 55, 41, 17, 15];

  return (
    <ChartDetail
      cardTitle={t('pages.dashboard.charts.categoryDistribution.title')}
      chartOption={options}
      chartSeries={series}
      chartType="donut"
      chartHeight={320}
    />
  );
};
