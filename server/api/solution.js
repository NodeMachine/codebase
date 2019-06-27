const router = require('express').Router()
const puppeteer = require('puppeteer')
const path = require('path')

module.exports = router

const test = () => {
  let el = document.getElementById('code-box')
  el.innerHTML += (doSomething(1) === 2) + ' '
  el.innerHTML += (doSomething(2) === 3) + ' '
}

// github answer -->

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
        console.log(err)
        reject('Your code timed out :(')
        // throw new Error('Your code timed out :(')
      })
  })
}

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

router.post('/', async (req, res, next) => {
  try {
    //
    const code = req.body.code
    let testResult = await promiseTimeout(
      3000,
      ssr(`file:${path.join(__dirname, 'toDelete.html')}`, code)
        .then(result => {
          console.log('result before filter', result)
          result = result.match(/\B>.*?<\/div/)[0]
          result = result.slice(1, result.length - 5)
          console.log('result it here', result)
          return result
        })
        .catch(err => console.log('in the catch', err))
    )
    console.log('>>> ', testResult)
    res.send(testResult)
  } catch (error) {
    console.log('In error block')
    res.send('YA TIMED OUT, SON')
    next(error)
  }
})
