import React from 'react';
import { Line } from '@ant-design/charts';

const Page = () => {
  const data = [
    { month: 'Jan', value: null },
    { month: 'Feb', value: null },
    { month: 'Mar', value: null },
    { month: 'Apr', value: null },
    { month: 'May', value: null },
    { month: 'Jun', value: 6 },
    { month: 'Jul', value: 7 },
    { month: 'Aug', value: 9 },
    { month: 'Sep', value: 13 },
    { month: 'Oct', value: 13 },
    { month: 'Nov', value: 5 },
    { month: 'Dec', value: 3 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    point: {
      size: 4,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

 
  
  return( 
    <Line {...config} />
  )
};
export default Page;