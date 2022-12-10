import React, { useEffect, useState } from 'react'
import { AreaChart, ResponsiveContainer,Area, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchHistoricalData } from '../api/stock-api';
import { chartConfig } from '../constants/config';
import { useStockContext } from '../context/StockContext';
import { useThemeContext } from '../context/ThemeContext';
import { convertDateToUnixTimestamp, convertUnixTimestampToDate, createDate } from '../helpers/date-helper';
import Card from './Card';
import ChartFilter from './ChartFilter';

const Chart = () => {
    const {darkMode} = useThemeContext()
    const {stockSymbol} = useStockContext()
    const [data,setData]= useState([]);
    const [filter,setFilter] = useState("1W");

    const formatData = (data)=>{
        return data.c.map((item,index)=>{
        return {
            value:item.toFixed(2),
            date:convertUnixTimestampToDate(data.t[index])
        }})
    }
    
    useEffect(()=>{
        const getDateRange = () => {
            const {days,weeks,months,years}=chartConfig[filter];
            const endDate = new Date();
            console.log(endDate);
            const startDate = createDate(endDate,-days,-weeks,-months,-years)
            
            const startTimestampUnix = convertDateToUnixTimestamp(startDate)
            const endTimestampUnix= convertDateToUnixTimestamp(endDate)
            return {startTimestampUnix,endTimestampUnix};
        };
        const updateChartData = async()=>{
            try{
                const {startTimestampUnix,endTimestampUnix} = getDateRange()
                const resolution = chartConfig[filter].resolution;
               
                const result = await fetchHistoricalData(stockSymbol,resolution,startTimestampUnix,endTimestampUnix);
                console.log(formatData(result))
                setData(formatData(result))
                
            }catch(error){
                setData([])
                console.log(error)
            }
        };
        
        updateChartData()
    },[stockSymbol,filter]);

  return (
    <Card>

        {/* for the buttons on the chart 1D,1W,1M,1Y */}
        <ul className='flex absolute top-2 right-2 z-40'>
            {Object.keys(chartConfig).map(item=>
                <>
                <li key={item}>
                <ChartFilter text={item} active={filter===item} onClick={()=>setFilter(item)}/>
                </li>
                </>
            )}
        </ul>

        {/* for the chart setup using Recharts */}
        <ResponsiveContainer>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="chuChartColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffa500" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ffa500" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#ffa500" fillOpacity={1} strokeWidth={0.5} fill="url(#chuChartColor)"/>
                <Tooltip
                contentStyle={darkMode?{backgroundColor:"#111827"}:null}
                itemStyle={darkMode?{color:"#ffa500"}:null}
                />
                <XAxis dataKey={"date"}/>
                <YAxis domain={["dataMin","dataMax"]}/>

            </AreaChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart