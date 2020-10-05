import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useQuery, QueryResult } from '@apollo/react-hooks';
import {
  YEARLY_RAINFALL,
  MONTHLY_RAINFALL,
  DAILY_RAINFALL,
} from './graphql/get-rainfall';
import './App.css';
interface YearlyRainfallData {
  yearlyRainfall: { rainfall: number; date: string }[];
}
interface MonthlyRainfallData {
  monthlyRainfall: { rainfall: number; date: string }[];
}
interface DailyRainfallData {
  dailyRainfall: { rainfall: number; date: string }[];
}
interface Props {
  granularity: 'year' | 'month' | 'day';
}
const Chart: React.FC<Props> = () => {
  const yearly: QueryResult<YearlyRainfallData> = useQuery(YEARLY_RAINFALL);
  const monthly: QueryResult<MonthlyRainfallData> = useQuery(MONTHLY_RAINFALL);
  const daily: QueryResult<DailyRainfallData> = useQuery(DAILY_RAINFALL);
  const yearlyOptions = {
    chart: {
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    title: {
      text: 'My chart',
    },
    xAxis: {
      categories: yearly.data?.yearlyRainfall.map((value) => value.date),
    },
    series: [
      {
        data: yearly.data?.yearlyRainfall.map((value) => value.rainfall),
      },
    ],
  };
  const monthlyOptions = {
    chart: {
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    title: {
      text: 'My chart',
    },
    xAxis: {
      categories: monthly.data?.monthlyRainfall.map((value) => value.date),
    },
    series: [
      {
        data: monthly.data?.monthlyRainfall.map((value) => value.rainfall),
      },
    ],
  };
  const dailyOptions = {
    chart: {
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
    },
    title: {
      text: 'My chart',
    },
    xAxis: {
      categories: daily.data?.dailyRainfall.map((value) => value.date),
    },
    series: [
      {
        data: daily.data?.dailyRainfall.map((value) => value.rainfall),
      },
    ],
  };
  return (
    <div className='App'>
      {(() => {})()}
      <HighchartsReact highcharts={Highcharts} options={yearlyOptions} />
      <HighchartsReact highcharts={Highcharts} options={monthlyOptions} />
      <HighchartsReact highcharts={Highcharts} options={dailyOptions} />
    </div>
  );
};

export default Chart;
