import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import "./index.css";

const BarChartComponent = (props) => {
  const { barChartData, selectMonth } = props;
  return (
    <div className="barchart-container mt-5 d-flex flex-column justify-content-center">
      <div>
        <h1 className="mb-5">
          Bar Chart Stats -{" "}
          {selectMonth.displayText === "Select Month" ? "Overall" : selectMonth.displayText}
        </h1>
      </div>
      <BarChart
        width={900}
        height={400}
        data={barChartData.barChartData}
        margin={{
          top: 5,
        }}
        grid={{ horizontal: true}}
      >
        <CartesianGrid vertical={false} horizontal={true}/>
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#6ce5e8" />
        
      </BarChart>
    </div>
  );
};

export default BarChartComponent;