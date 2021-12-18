import { PieChart, Pie, Tooltip } from 'recharts';


const ChartPercentage = ({dataPersent})=> {
    return (
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive
              data={dataPersent}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#7367f0b3"
              label
            />
            <Tooltip />
          </PieChart>
      );
}


export default ChartPercentage
