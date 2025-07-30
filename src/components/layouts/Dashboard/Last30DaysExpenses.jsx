import React, { useState } from 'react'
import { prepareExpenseBarChartData } from '../../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';
import { useEffect } from 'react';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartdata] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartdata(result);
        
        return () => {};
    }, [data]);

  return (
    <div className="card col-span-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData}  xAxisKey="category"/>
    </div>
  )
}

export default Last30DaysExpenses
