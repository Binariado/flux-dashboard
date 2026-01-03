import { ChartDetail } from '@/components/ui/chart/charts';
import type { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const ServerStatusChart = () => {
  const { t } = useTranslation();

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: 'server-status',
        toolbar: { show: false },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val) {
                return parseInt(val.toString()) + '%';
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: [t('pages.dashboard.charts.serverStatus.label')],
    }),
    [t],
  );

  const series = [76];

  return (
    <ChartDetail
      cardTitle={t('pages.dashboard.charts.serverStatus.title')}
      chartOption={options}
      chartSeries={series}
      chartType="radialBar"
      chartHeight={320}
    />
  );
};
