// const express = require("express");
// const morgan = require("morgan");
// const postBank = require("./postBank");

// const app = express();

// app.use(morgan('dev'));
// app.use(express.static('./public'))

// app.get("/", (req, res) => {
//   const posts = postBank.list();

//   const html = 
//   `<!DOCTYPE html>
//   <html>
//   <head>
//     <title>Lord of the Rings Characters</title>
//     <link rel="stylesheet" href="/style.css" />
//   </head>
//   <body>
//     <div class="char-list">
//       <header><img src="/ring_logo.png"/>Lord of the Rings Characters</header>
//       ${posts.map(post => `
//         <div class='char-item'>
//           <p>
//             <a href='/posts/${post.id}'><span class="char-position"> <img src="/tree.png" height="25px" width="25px"/></span> ${post.name} : ${post.miniBio}</a>
//           </p>
//         </div>`
//       ).join('')}
//     </div>
//   </body>
// </html>`

//   res.send(html);
// });

// app.get("/posts/:id", (req, res) => {
//   const post = postBank.find(req.params.id);

//   if (!post.id) {
//     res.send(
//       `<!DOCTYPE html>
//     <html>
//     <head>
//       <title>Page Not Found</title>
//       <link rel="stylesheet" href="/style.css" />
//     </head>
//     <body style="background-image: url("frodo-gif.gif");">
//       <div >
//       <p>
//       Oh no! This page is unavailable. Click below to continue your journey...
//       </p>
//       <a href="/">
//         <img src="/frodo-gif.gif" width="1800px" height="1800px"/>
//       </a>
//       </div>

//     </body>
//   </html>`)

//   } else {
//     const postsHTML = 
//     `<!DOCTYPE html>
//     <html>
//     <head>
//       <title>Lord of the Rings Characters</title>
//       <link rel="stylesheet" href="/style.css" />
//     </head>
//     <body>
//       <div class="char-list">
//         <header font-color="#FFFFFF" margin="15px"><a href='/'><img src="/lotr_logo.png" width="60px" height="60px"/></a>${post.name}</header>
        
//           <div class="char-item">
//             <p >
//               <a href='/posts/${post.id}'><span class="char-position"> </span> </a>
//               <img src="/lotr_${post.id}.jpeg" width="80px" height="80px" style="float:left padding=5px" margin-right="1rem"/>
//             </p>
//             <p style="line-height:1.75">
//               ${post.bio}  
//             </p>
//           </div>
//       </div>
//     </body>
//   </html>`
  
//     res.send(postsHTML)
//   }

// })

// const PORT = 3791;

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });