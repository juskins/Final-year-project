import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import {
//   Icon, // Material-UI Icon component
//   ReportProblem, // Expired icon
//   CheckCircle, // Fresh icon
//   HourglassEmpty, // Soon to Expire icon
// } from '@mui/icons-material';

const data = [
     { month: 'Jan', expired: 10, fresh: 30, soonToExpire: 20 },
     { month: 'Feb', expired: 15, fresh: 35, soonToExpire: 25 },
     // Add data for other months
   ];

   const COLORS = ['#FF0000', '#008000', '#131A4E'];

   const HistogramChart = () => {
     return (
       <ResponsiveContainer width="100%" height={400}>
         <BarChart data={data}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="month" />
           <YAxis />
           <Tooltip />
           <Legend />
           <Bar dataKey="expired" stackId="a" fill="#FF0000" />
           <Bar dataKey="fresh" stackId="a" fill="#008000" />
           <Bar dataKey="soonToExpire" stackId="a" fill="#131A4E" />
         </BarChart>
       </ResponsiveContainer>
     );
   };
   
   export default HistogramChart;
   