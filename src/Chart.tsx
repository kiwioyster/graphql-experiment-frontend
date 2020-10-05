import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useQuery, QueryResult } from '@apollo/react-hooks';
import {
  YEARLY_RAINFALL,
  MONTHLY_RAINFALL,
  DAILY_RAINFALL,
  AVG_RAINFALL,
} from './graphql/get-rainfall';
import './App.css';
interface YearlyRainfallData {
  yearlyRainfall: { rainfall: number; date: number }[];
}
interface MonthlyRainfallData {
  monthlyRainfall: { rainfall: number; date: number }[];
}
interface DailyRainfallData {
  dailyRainfall: { rainfall: number; date: number }[];
}
interface MonthlyAvgRainfallData {
  monthlyAvgRainfall: { rainfall: number; month: number }[];
}
interface Props {
  granularity: 'year' | 'month' | 'day';
}
const Chart: React.FC<Props> = () => {
  const yearly: QueryResult<YearlyRainfallData> = useQuery(YEARLY_RAINFALL);
  const monthly: QueryResult<MonthlyRainfallData> = useQuery(MONTHLY_RAINFALL);
  const daily: QueryResult<DailyRainfallData> = useQuery(DAILY_RAINFALL);
  const monthlyAvg: QueryResult<MonthlyAvgRainfallData> = useQuery(
    AVG_RAINFALL
  );
  const yearlyOptions = {
    rangeSelector: {
      enabled: true,
      inputEnabled: true,
      x: 0,
      verticalAlign: 'top',
      buttonPosition: {
        align: 'left',
      },
    },
    title: {
      text: 'Annual rainfall',
    },
    xAxis: {
      minRange: 1,
      scrollbar: {
        enabled: true,
      },
      type: 'datetime',
    },
    series: [
      {
        data: yearly.data?.yearlyRainfall.map((value) => [
          value.date,
          value.rainfall,
        ]),
      },
    ],
  };
  const monthlyOptions = {
    rangeSelector: {
      enabled: true,
      inputEnabled: true,
      x: 0,
      verticalAlign: 'top',
      buttonPosition: {
        align: 'left',
      },
    },
    chart: {
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    title: {
      text: 'Monthly rainfall',
    },
    xAxis: {
      minRange: 1,
      scrollbar: {
        enabled: true,
      },
      type: 'datetime',
    },
    series: [
      {
        data: monthly.data?.monthlyRainfall.map((value) => [
          value.date,
          value.rainfall,
        ]),
      },
      {
        name: 'Average',
        data: monthly.data?.monthlyRainfall.map((value) => {
          const d = new Date(value.date);
          return [
            value.date,
            monthlyAvg.data?.monthlyAvgRainfall[d.getMonth()].rainfall,
          ];
        }),
      },
    ],
  };
  const dailyOptions = {
    rangeSelector: {
      enabled: true,
      inputEnabled: true,
      x: 0,
      verticalAlign: 'top',
      buttonPosition: {
        align: 'left',
      },
    },
    chart: {
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    title: {
      text: 'Daily rainfall',
    },
    xAxis: {
      minRange: 1,
      scrollbar: {
        enabled: true,
      },
      type: 'datetime',
    },
    series: [
      {
        data: daily.data?.dailyRainfall.map((value) => [
          value.date,
          value.rainfall,
        ]),
      },
    ],
  };
  return (
    <div className='App'>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={yearlyOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={monthlyOptions}
      />
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={dailyOptions}
      />
    </div>
  );
};

export default Chart;
