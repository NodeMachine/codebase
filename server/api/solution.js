const router = require('express').Router()
const puppeteer = require('puppeteer')
const path = require('path')

module.exports = router

// Hard coded test. Tests will be stored in the DB and retieved when needed.
const test = () => {
  let el = document.getElementById('code-box')
  el.innerHTML += (doSomething(1) === 2) + ' '
  el.innerHTML += (doSomething(2) === 3) + ' '
}

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
async function ssr(url, userCode) {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle0'})
  await page.addScriptTag({content: `${userCode}`})
  await page.evaluate(test)
  const html = await page.content()
  await browser.close()
  return html
}

// Post requests will eventually have an id parameter which will be used to query tests from the database
router.post('/', async (req, res, next) => {
  try {
    const code = req.body.code
    console.log('code: ', code)

    let testResult = await promiseTimeout(
      7000,
      ssr(`file:${path.join(__dirname, 'testingEnviroment.html')}`, code)
        .then(result => {
          result = result.match(/\B>.*?<\/div/)[0]
          result = result.slice(1, result.length - 5)
          console.log('result: ', result)
          return result
        })
        .catch(err => console.log(err))
    )
    res.send(testResult)
  } catch (error) {
    res.send('Your solution timed out.')
    next(error)
  }
})
