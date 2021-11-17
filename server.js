const { syncAndSeed } = require('./db');
const chalk = require('chalk')

const init = async() => {
    try {
        await syncAndSeed();
        console.log('all good seeded');
    }
    catch(ex) {
        console.log(chalk.magenta(ex));
    }
};

init()



///ORIGINAL APP SERVER _________________________________________

// const pg = require('pg');
// const express = require ('express');
// const path = require ('path');
// const db = require('./db')
// const app = express();


// app.use('/', express.static(path.join(__dirname, 'public')));

// app.get('/', async(req, res) => {
//     try {
//         const response = await client.query('SELECT * FROM users;');
//         const characters = response.rows;

//         console.log(characters)

//         res.send(
//         `<!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Lord of the Rings Characters</title>
//                 <link rel="stylesheet" href="style.css"/>
//             </head>
//             <body>
//                 <div class="char-list">
//                 <header><img src="ring_logo.png"/>Lord of the Rings Characters</header>
//                 ${characters.map(post => `
//                     <div class='char-item'>
//                     <p>
//                         <a href='/posts/${post.id}'><span class="char-position"> <img src="/tree.png" height="25px" width="25px"/></span> ${post.name} : ${post.minibio}</a>
//                     </p>
//                     </div>`
//                 ).join('')}
//                 </div>
//             </body>
//             </html>`
//         );
//     } 
//     catch(e) {
//         next(e);
//     }
// })

// app.get('/posts/:id', async(req, res, next) => {
    
//     try {
//     const response = await client.query('SELECT * FROM users WHERE id=$1;', [req.params.id]);
//     const characters = response.rows;

//     // this res.send only uses some of my css, I think its only using my inline styles...
//         res.send(
//             `<!DOCTYPE html>
//             <html>
//                 <head>
//                     <title>Lord of the Rings Characters</title>
                    
//                 </head>
                
//                 <body>
//                 ${characters.map(post => 

//                 `<div class="char-list">
//                 <header font-color="#FFFFFF" margin="15px"><a href='/'><img src="/lotr_logo.png" width="60px" height="60px"/></a>${post.name}</header>    
//                     <div class="char-item">
//                     <p>
//                         <a href='/posts/${post.id}'><span class="char-position"> </span> </a>
//                         <img src="/lotr_${post.id}.jpeg" width="80px" height="80px" style="float:left padding=5px" margin-right="1rem"/>
//                     </p>
//                     <p style="line-height:1.75">
//                         ${post.bio}  
//                     </p>
//                     </div>
//                 </div>`).join('')}

//                 </body>
//             </html>`
//                 )
    
//     }

//     //tried to make a custom error page, works sometimes, maybe there's another way to make this work?

//     catch (e) {
//         e = res.send(
//               `<!DOCTYPE html>
//                   <html>
//                   <head>
//                       <title>Page Not Found</title>
//                       <link rel="stylesheet" href="style.css" />
//                   </head>
//                   <body style="background-image: url("frodo-gif.gif");">
//                       <div >
//                           <p>
//                               Oh no! This page is unavailable. Click below to continue your journey...
//                           </p>
//                           <a href="/">
//                               <img src="/frodo-gif.gif" width="1800px" height="1800px"/>
//                           </a>
//                       </div>
//                   </body>
//               </html>`)
//         next(e);
//     }
//   })

// const PORT = 3791;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

// const client = new pg.Client('postgres://localhost/lotr');

// const syncAndSeed = async() => {
//     await client.query(db);
// }

// const init = async() => {
//     try {
//         await client.connect();
//         await syncAndSeed();
//         console.log('connected to database');
        
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

// init();