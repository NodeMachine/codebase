import React, {Component} from 'react'
import {BarChart, Bar, Tooltip, Legend} from 'recharts'

export const UserAnalytics = props => {
  const problems = props.problems
  const easy = problems.filter(problem => problem.points < 20).length
  const medium = problems.filter(
    problem => problem.points > 19 && problem.points < 60
  ).length
  const hard = problems.filter(problem => problem.points > 59).length

  const data = [
    {
      name: 'Difficulty',
      easy: easy,
      medium: medium,
      hard: hard
    }
  ]

  return (
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
      {/* <CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis /> */}
      <Tooltip />
      <Legend />
      <Bar dataKey="easy" stackId="a" fill="#6FF9FF" />
      <Bar dataKey="medium" stackId="a" fill="#26C6DA" />
      <Bar dataKey="hard" stackId="a" fill="#0095A8" />
    </BarChart>
  )
}
