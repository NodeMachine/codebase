import React from 'react'
import {IconContext} from 'react-icons'
import {MdDone, MdClose} from 'react-icons/md'

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
                } // Actual: ${result.actualOutput || 'Check your code'}`}
                <span>
                  {result.pass ? (
                    <IconContext.Provider value={{color: 'green'}}>
                      <MdDone />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{color: 'red'}}>
                      <MdClose />
                    </IconContext.Provider>
                  )}
                </span>
                <br />
              </li>
            ))
          : `${props.error || ''}`}
      </ul>
    </div>
  )
}

export default ResultWindow
