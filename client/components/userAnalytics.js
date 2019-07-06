import React, {Component} from 'react'
import {BarChart, Bar, Tooltip, Legend, PieChart, Pie} from 'recharts'
import './userAnalytics.css'

const data01 = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
  {name: 'Group E', value: 278},
  {name: 'Group F', value: 189}
]

export const UserAnalytics = props => {
  const problems = props.problems
  const easy = problems.filter(problem => problem.points < 20).length
  const medium = problems.filter(
    problem => problem.points > 19 && problem.points < 60
  ).length
  const hard = problems.filter(problem => problem.points > 59).length

  const categories = problems.map(problem => problem.category)

  console.log('CATEGORIES', categories)

  const data = [
    {
      name: 'Difficulty',
      easy: easy,
      medium: medium,
      hard: hard
    }
  ]

  return (
    <div className="charts-container">
      <div>
        <p>Difficulty breakdown:</p>
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <Tooltip />
          <Legend />
          <Bar dataKey="easy" stackId="a" fill="#6FF9FF" />
          <Bar dataKey="medium" stackId="a" fill="#26C6DA" />
          <Bar dataKey="hard" stackId="a" fill="#0095A8" />
        </BarChart>
      </div>
      <div>
        <p>Category breakdown:</p>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx={200}
            cy={200}
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
