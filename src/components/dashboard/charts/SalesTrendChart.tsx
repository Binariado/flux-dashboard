import { ChartDetail } from '@/components/ui/chart/charts';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import type { ApexOptions } from 'apexcharts';

export const SalesTrendChart = () => {
  const { t } = useTranslation();

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: 'sales-trend',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      colors: ['#00E396'],
      xaxis: {
        categories: t('pages.dashboard.charts.salesTrend.months', {
          returnObjects: true,
        }) as string[],
      },
      dataLabels: { enabled: false },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      tooltip: {
        theme: 'dark',
      },
    }),
    [t],
  );

  const series = [
    {
      name: t('pages.dashboard.charts.salesTrend.series'),
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <ChartDetail
      cardTitle={t('pages.dashboard.charts.salesTrend.title')}
      chartOption={options}
      chartSeries={series}
      chartType="area"
      chartHeight={300}
    />
  );
};
