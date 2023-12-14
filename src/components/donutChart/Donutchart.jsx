import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./Donutchart.scss";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DonutChart = ({ freshCount, expiringSoonCount, expiredCount }) => {
  const total = freshCount + expiringSoonCount + expiredCount;
  const freshPercentage = ((freshCount / total) * 100).toFixed(2);
  const expiringSoonPercentage = ((expiringSoonCount / total) * 100).toFixed(2);
  const expiredPercentage = ((expiredCount / total) * 100).toFixed(2);
  const data = [
    { name: "Fresh", value: freshCount },
    { name: "Expired", value: expiringSoonCount },
    { name: "Soon to Expire", value: expiredCount },
  ];
  const COLORS = ["blue", "green", "darkred"];
  
  return (
    <div className="featured">
      {total > 0?
      <div className="flex">
        <div className="flex">
          <div
            className=""
            style={{ backgroundColor: "blue", padding: "0px 10px" }}
          >
            <small>{freshPercentage}%</small>
          </div>
          <p>Fresh</p>
        </div>
        <div className="flex">
          <div
            className=""
            style={{ backgroundColor: "green", padding: "0px 10px" }}
          >
            <small>{expiringSoonPercentage}%</small>
          </div>
          <p>Expiring soon</p>
        </div>
        <div className="flex">
          <div
            className=""
            style={{ backgroundColor: "darkred", padding: "0px 10px" }}
          >
            <small>{expiredPercentage}%</small>
          </div>
          <p>Expired</p>
        </div>
      </div>:<p>No Product Available</p>}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={150}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
