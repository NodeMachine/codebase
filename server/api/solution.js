const router = require('express').Router()
const puppeteer = require('puppeteer')
const path = require('path')

module.exports = router

const test = () => {
  let el = document.getElementById('code-box')
  el.innerHTML += (doSomething(1) === 2) + ' '
  el.innerHTML += (doSomething(2) === 3) + ' '
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
    ssr(`file:${path.join(__dirname, 'toDelete.html')}`, code)
      .then(result => {
        console.log('result before filter', result)
        result = result.match(/\B>.*?<\/div/)[0]
        result = result.slice(1, result.length - 5)
        console.log('result it here', result)
        res.send(result)
      })
      .catch(err => console.log('in the catch', err))
  } catch (error) {
    console.log('hi')
    next(error)
  }
})
