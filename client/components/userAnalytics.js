import React from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  XAxis,
  YAxis
} from 'recharts'
import './userAnalytics.css'

export const UserAnalytics = props => {
  const solvedProblems = props.solvedProblems

  const easy = solvedProblems.filter(problem => problem.points < 20).length
  const medium = solvedProblems.filter(
    problem => problem.points > 19 && problem.points < 60
  ).length
  const hard = solvedProblems.filter(problem => problem.points > 59).length
  const difficultyData = [
    {
      name: 'Difficulty',
      easy: easy,
      medium: medium,
      hard: hard
    }
  ]

  const categoriesData = []
  solvedProblems.forEach(problem => {
    const dataPoint = {name: problem.category, value: problem.points}
    const idx = categoriesData.findIndex(datum => datum.name === dataPoint.name)
    if (idx > -1) {
      categoriesData[idx].value += dataPoint.value
    } else {
      categoriesData.push(dataPoint)
    }
  })

  return (
    <div className="charts-container">
      <div className="chart-item">
        <p>Difficulty Breakdown</p>
        <div className="chartWrapper">
          <BarChart
            width={300}
            height={100}
            data={difficultyData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis type="number" dataKey="" tick={false} hide={true} />
            <YAxis type="category" dataKey="" tick={false} hide={true} />/
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" />
            <Bar dataKey="easy" stackId="a" fill="#6FF9FF" />
            <Bar dataKey="medium" stackId="a" fill="#26C6DA" />
            <Bar dataKey="hard" stackId="a" fill="#0095A8" />
          </BarChart>
        </div>
      </div>
      <div className="chart-item">
        <p>Points by Category</p>
        <div className="chartWrapper">
          <PieChart width={250} height={250} className="pie-chart-container">
            <Pie
              dataKey="value"
              // isAnimationActive={false}
              data={categoriesData}
              // cx={200}
              // cy={200}
              outerRadius={50}
              fill="#26C6DA"
              label
            />
            <Legend
              payload={categoriesData.map(item => ({
                id: item.name,
                type: 'square',
                value: `${item.name}: ${item.value} pts`,
                height: 0
              }))}
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  )
}
