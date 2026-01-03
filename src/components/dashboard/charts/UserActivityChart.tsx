import { ChartDetail } from '@/components/ui/chart/charts';
import type { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const UserActivityChart = () => {
  const { t } = useTranslation();

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: 'user-activity',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '55%',
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      colors: ['#775DD0', '#FEB019'],
      xaxis: {
        categories: t('pages.dashboard.charts.userActivity.days', {
          returnObjects: true,
        }) as string[],
      },
      yaxis: {
        title: { text: t('pages.dashboard.charts.userActivity.yAxis') },
      },
      fill: { opacity: 1 },
      tooltip: {
        theme: 'dark',
      },
      legend: {
        position: 'top',
      },
    }),
    [t],
  );

  const series = [
    {
      name: t('pages.dashboard.charts.userActivity.series.activeUsers'),
      data: [44, 55, 57, 56, 61, 58, 63],
    },
    {
      name: t('pages.dashboard.charts.userActivity.series.newRegisters'),
      data: [76, 85, 101, 98, 87, 105, 91],
    },
  ];

  return (
    <ChartDetail
      cardTitle={t('pages.dashboard.charts.userActivity.title')}
      chartOption={options}
      chartSeries={series}
      chartType="bar"
      chartHeight={300}
    />
  );
};
