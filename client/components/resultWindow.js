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
      <ul>
        {props.results && props.results.length
          ? props.results.map((result, ind) => {
              if (!props.results[0].pass) {
                return (
                  <li key={ind} className="resultItem">
                    <span>{`INPUT: ${result.input}`}</span>
                    {ind === 0 && (
                      <span>{`Expected: ${result.expectedOutput}`}</span>
                    )}
                    {ind === 0 && (
                      <span>
                        <IconContext.Provider
                          value={{color: '#26C6DA', className: 'iconContainer'}}
                        >
                          <MdTrendingFlat />
                        </IconContext.Provider>
                      </span>
                    )}
                    {ind === 0 && (
                      <span>{`Actual: ${result.actualOutput ||
                        'Check your code'}`}</span>
                    )}
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
                    <span>Unexpected return type</span>
                    <IconContext.Provider
                      value={{color: '#DB350A', className: 'iconContainer'}}
                    >
                      <MdClose />
                    </IconContext.Provider>
                  </li>
                )
              } else {
                return (
                  <li key={ind} className="resultItem">
                    <span>{`INPUT: ${result.input}`}</span>
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
                    <span>{`Actual: ${result.actualOutput ||
                      'Check your code'}`}</span>

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
                )
              }
            })
          : `${props.error || ''}`}
      </ul>
    </div>
  )
}

export default ResultWindow
