import React, {Component} from 'react'

const ResultWindow = props => {
  return (
    <div>
      <h4>Tests</h4>
      <hr />
      <ul>
        {props.result && props.result.length
          ? props.result.map((result, ind) => (
              <li key={ind}>
                {`Input: ${result.input} => Expected: ${
                  result.expectedOutput
                } // Actual: ${result.actualOutput || 'Check your code'} //${
                  result.pass ? 'Passing' : 'Failing'
                }`}
                <br />
              </li>
            ))
          : `${props.error || ''}`}
      </ul>
    </div>
  )
}

export default ResultWindow
