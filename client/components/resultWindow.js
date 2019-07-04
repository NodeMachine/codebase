import React, {Component} from 'react'

const ResultWindow = props => {
  return (
    <div>
      ... and this is a result window!
      <ul>
        {props.result
          ? props.result.map((result, ind) => (
              <li key={ind}>{`Function input: ${
                result.input
              } => Expected output: ${
                result.expectedOutput
              } // Actual output: ${result.actualOutput ||
                'Check your code'} //${
                result.pass ? 'Passing' : 'Failing'
              }`}</li>
            ))
          : `${props.error}`}
      </ul>
    </div>
  )
}

export default ResultWindow
