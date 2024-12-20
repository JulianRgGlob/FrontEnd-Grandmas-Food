import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { salesDataset, valueFormatter } from './datasetSales'
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function ReportSales() {
  const chartSetting = {
    xAxis: [
      {
        label: 'Dollars($)',
        dataKey: 'month',
        scaleType: 'band',
      },
    ],
    width: 1000,
    height: 500,
    
  }
  return (
    <BarChart
      sx={{ padding: 1 }}
      dataset={salesDataset}
      yAxis={[{ scaleType: 'linear', label: 'Sales in $' , tickSize: 10,}]}
      series={[
        { dataKey: 'grilledChicken', label: 'Grilled Chicken', valueFormatter },
        { dataKey: 'spaghetti', label: 'Spaghetti' },
        { dataKey: 'tomatoSoup', label: 'Tomato Soup' },
        { dataKey: 'orangeJuice', label: 'Orange Juice' },
        { dataKey: 'pancake', label: 'Pancake' },
        { dataKey: 'bbqRibs', label: 'BBQ Ribs' },
        { dataKey: 'veganBurger', label: 'Vegan Burger' },
        { dataKey: 'mozzarella', label: 'Mozzarella' },
        { dataKey: 'chocolateCake', label: 'Chocolate Cake' },
        { dataKey: 'cheesecake', label: 'Cheesecake' },
        { dataKey: 'macNCheese', label: 'Mac n Cheese' },
        { dataKey: 'limonade', label: 'Limonade' },
        { dataKey: 'grilledSalmon', label: 'Grilled Salmon' },
      ]}
      layout="vertical"
      {...chartSetting}
    />
  )
}

export default ReportSales
