import React from 'react'
import {IconContext} from 'react-icons'
import {
  MdDone,
  MdClose,
  MdKeyboardArrowRight,
  MdTrendingFlat
} from 'react-icons/md'

const ResultWindow = props => {
  return (
    <div>
      <h4>Tests</h4>
      <hr />
      <ul>
        {props.result && props.result.length
          ? props.result.map((result, ind) => (
              <li key={ind} className="resultItem">
                <span>{`IN: ${result.input}`}</span>
                <span>
                  <IconContext.Provider
                    value={{
                      color: '#26C6DA',
                      className: 'iconContainer'
                    }}
                  >
                    <MdKeyboardArrowRight />
                  </IconContext.Provider>
                </span>
                <span>{`Expected: ${result.expectedOutput}`}</span>
                <span>
                  <IconContext.Provider
                    value={{color: '#26C6DA', className: 'iconContainer'}}
                  >
                    <MdTrendingFlat />
                  </IconContext.Provider>
                </span>
                <span>
                  {`Actual: ${result.actualOutput || 'Check your code'}`}
                </span>

                <span>
                  {result.pass ? (
                    <IconContext.Provider
                      value={{color: '#73DA97', className: 'iconContainer'}}
                    >
                      <MdDone />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{color: '#DB350A', className: 'iconContainer'}}
                    >
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
