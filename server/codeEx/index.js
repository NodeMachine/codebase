const puppeteer = require('puppeteer')
const path = require('path')

async function ssr(url, userCode) {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle0'})
  const html = await page.content()
  await browser.close()
  return html
}

let result = ssr(`file:${path.join(__dirname, 'toDelete.html')}`).then(result =>
  console.log(result.match(/\B>.*?<\/div/)[0])
)

// function promiseTimeout(ms, promise){

//   return new Promise(function(resolve, reject){

//     // create a timeout to reject promise if not resolved
//     var timer = setTimeout(function(){
//         reject(new Error("promise timeout"));
//     }, ms);

//     promise
//         .then(function(res){
//             clearTimeout(timer);
//             resolve(res);
//         })
//         .catch(function(err){
//             console.log(err)
//             clearTimeout(timer);
//             reject(err);
//         });
//   });
// };

// promiseTimeout(2000, result)

// <!DOCTYPE html><html><head>

// </head>
// <body>
//   <div id="code-box">25, 36, 49, </div>
//   <script>
//     let items = [5, 6, 7]
//     const div = document.getElementById("code-box")
//     items.map(val=>{
//       div.innerHTML += `${val**2}, `
//     })
//   </script>
