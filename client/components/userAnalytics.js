import React, {Component} from 'react'
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
  const problems = props.problems

  const easy = problems.filter(problem => problem.points < 20).length
  const medium = problems.filter(
    problem => problem.points > 19 && problem.points < 60
  ).length
  const hard = problems.filter(problem => problem.points > 59).length
  const difficultyData = [
    {
      name: 'Difficulty',
      easy: easy,
      medium: medium,
      hard: hard
    }
  ]

  const categoriesData = []
  problems.forEach(problem => {
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
      <p>Difficulty Breakdown</p>
      <div className="chart-item">
        <BarChart
          width={400}
          height={150}
          data={difficultyData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="easy" stackId="a" fill="#6FF9FF" />
          <Bar dataKey="medium" stackId="a" fill="#26C6DA" />
          <Bar dataKey="hard" stackId="a" fill="#0095A8" />
        </BarChart>
      </div>
      <div className="chart-item">
        <p>Points by Category</p>
        <PieChart width={300} height={300} className="pie-chart-container">
          <Pie
            dataKey="value"
            // isAnimationActive={true}
            data={categoriesData}
            // cx={200}
            // cy={200}
            outerRadius={80}
            fill="#26C6DA"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  )
}
