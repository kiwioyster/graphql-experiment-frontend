import gql from 'graphql-tag';
export const YEARLY_RAINFALL = gql`
  query yearlyRainfall {
    yearlyRainfall {
      date
      rainfall
    }
  }
`;
export const MONTHLY_RAINFALL = gql`
  query monthlyRainfall {
    monthlyRainfall {
      date
      rainfall
    }
  }
`;
export const DAILY_RAINFALL = gql`
  query dailyRainfall {
    dailyRainfall {
      date
      rainfall
    }
  }
`;
