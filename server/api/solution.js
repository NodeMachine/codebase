const router = require('express').Router()
const puppeteer = require('puppeteer')
const path = require('path')
const {getProblemById} = require('../db/queryFunctions/problemQueryFunctions')

module.exports = router

// Function used to timeout async functions. Protects against infinite loops and stuff.
function promiseTimeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    // create a timeout to reject promise if not resolved
    var timer = setTimeout(function() {
      reject(new Error('promise timeout'))
    }, ms)

    promise
      .then(function(res) {
        clearTimeout(timer)
        resolve(res)
      })
      .catch(function(err) {
        clearTimeout(timer)
        reject(err)
      })
  })
}

// Function opens up a instance of Chrome, inserts the user's code via a script tag, evaluates the code against the tests, and returns the html document as a string.
async function ssr(url, userCode, userProblemTests) {
  const testArr = userProblemTests.split(', ')
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle0'})
  await page.addScriptTag({content: `${userCode}`})
  await page.addScriptTag({
    content: `function tests () {
  const testArr = [${testArr}]
  let el = document.getElementById('code-box')
  testArr.forEach(test => {
    el.innerHTML += test + ' '
  })
}
tests()`
  })
  await page.evaluate(() => 'hi')
  const html = await page.content()
  await browser.close()
  return html
}

// Post requests will eventually have an id parameter which will be used to query tests from the database
router.post('/:id', async (req, res, next) => {
  try {
    const code = req.body.code
    const problemId = req.params.id
    const problem = await getProblemById(problemId)
    const testingEnvironmentPath = `file:${path.join(
      __dirname,
      'testingEnviroment.html'
    )}`
    let testResult = await promiseTimeout(
      7000,
      ssr(testingEnvironmentPath, code, problem.tests)
        .then(result => {
          result = result.match(/\B>.*?<\/div/)[0]
          result = result.slice(1, result.length - 5)
          return result
        })
        .catch(err => console.log(err))
    )
    res.send(testResult)
  } catch (error) {
    res.send('Your solution timed out.')
  }
})
