const pg = require('pg');
const express = require ('express');
const path = require ('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    try {
        const response = await client.query('SELECT * FROM users;');
        const characters = response.rows;

        console.log(characters)

        res.send(
        `<!DOCTYPE html>
            <html>
            <head>
                <title>Lord of the Rings Characters</title>
                <link rel="stylesheet" href="style.css"/>
            </head>
            <body>
                <div class="char-list">
                <header><img src="ring_logo.png"/>Lord of the Rings Characters</header>
                ${characters.map(post => `
                    <div class='char-item'>
                    <p>
                        <a href='/posts/${post.id}'><span class="char-position"> <img src="/tree.png" height="25px" width="25px"/></span> ${post.name} : ${post.minibio}</a>
                    </p>
                    </div>`
                ).join('')}
                </div>
            </body>
            </html>`
        );
    } 
    catch(e) {
        next(e);
    }
})

app.get('/posts/:id', async(req, res, next) => {
    
    try {
    const response = await client.query('SELECT * FROM users WHERE id=$1;', [req.params.id]);
    const characters = response.rows;

        res.send(
            `<!DOCTYPE html>
            <html>
                <head>
                    <title>Lord of the Rings Characters</title>
                </head>
                <body>
                ${characters.map(post => 

                `<div class="char-list">
                <header font-color="#FFFFFF" margin="15px"><a href='/'><img src="/lotr_logo.png" width="60px" height="60px"/></a>${post.name}</header>    
                    <div class="char-item">
                    <p>
                        <a href='/posts/${post.id}'><span class="char-position"> </span> </a>
                        <img src="/lotr_${post.id}.jpeg" width="80px" height="80px" style="float:left padding=5px" margin-right="1rem"/>
                    </p>
                    <p style="line-height:1.75">
                        ${post.bio}  
                    </p>
                    </div>
                </div>`).join('')}
                
                </body>
            </html>`
                )
    
    }
    catch (e) {
        e = res.send(
              `<!DOCTYPE html>
                  <html>
                  <head>
                      <title>Page Not Found</title>
                      <link rel="stylesheet" href="style.css" />
                  </head>
                  <body style="background-image: url("frodo-gif.gif");">
                      <div >
                          <p>
                              Oh no! This page is unavailable. Click below to continue your journey...
                          </p>
                          <a href="/">
                              <img src="/frodo-gif.gif" width="1800px" height="1800px"/>
                          </a>
                      </div>
                  </body>
              </html>`)
        next(e);
    }
  })

const PORT = 3791;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const client = new pg.Client('postgres://localhost/lotr');

const syncAndSeed = async() => {
    const SQL = `
    DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  miniBio varchar(1000) DEFAULT NULL,
  bio TEXT DEFAULT NULL
  );

INSERT INTO users (name, miniBio, bio) VALUES ('Gandalf', 'A wizard, the first leader of the Fellowship...', 'Gandalf the Grey is a wizard, the first leader of the Fellowship, and the possessor of one of the three Elf rings which can be controlled by the Ring of Power. Whether he\''s really been killed by the Balrog, a monster of fire, or not, like the Terminator and like Spock, Gandalf will come back. But this time, our white knight switches to a more appropriate costume as "Gandalf the White."');
INSERT INTO users (name, miniBio, bio) VALUES ('Bilbo', 'A strange and wonderful hobbit...', 'Bilbo Baggins is a strange and wonderful hobbit. Unlike the other happy hobbits, Bilbo enjoys adventures. His first one was with Gandalf and a group of dwarves, one of them being Gimli\''s father, Gloin. He also spent two weeks hiding in the palace of Legolas\''s father, while trying to come up with a plan for freeing his dwarf friends. Bilbo finds the Ring of Power on that trip, and keeps the ring a secret for decades, seemingly not aging over that time. It\''s only when he feels old and "thin" that Bilbo recognizes it\''s time to go on a last adventure - to visit again the Elves of Rivendell. Pushed hard by Gandalf, Bilbo leaves the Ring behind for his heir and cousin, Frodo Baggins.');
INSERT INTO users (name, miniBio, bio) VALUES ('Frodo', 'The Ring-Bearer...', 'Frodo is the Ring-Bearer. Inheriting the Ring of Power from his cousin Bilbo, Frodo learns from Gandalf that the ring is about to bring its evil to the gentle beauty of the Shire if it remains there. Frodo accepts the responsibility for destroying the ring in the fires of Mordor, the evil location from which it came. He\''s accompanied on this dangerous quest by the Fellowship of the Ring - Gandalf, Aragorn, Boromir, Legolas, Gimli, Sam, Merry and Pippin.');
INSERT INTO users (name, miniBio, bio) VALUES ('Sam', 'A hobbit, is Frodo\''s gardener, and dear friend...', 'Samwise Gamgee, a hobbit, is Frodo\''s gardener, and dear friend. Sam insists on accompanying his friend on his dangerous trip. Sam becomes one of the Fellowship of the Ring, and is the only one to remain with Frodo all the way to the end.');
INSERT INTO users (name, miniBio, bio) VALUES ('Aragorn', 'Also known as Strider, is a descendant of the human king...', 'Aragorn, also known as Strider, is a descendant of the human king who was too weak to destroy the Ring of Power when it came into his hands. Raised by the Elf King Elrond in Rivendell after the death of his parents, Aragorn learns as an adult that he is heir to the throne of Gondor. He also learns that he loves Elrond\''s daughter Arwen. Aragorn joins the Fellowship of the Ring but, after Frodo secretly leaves the Fellowship to continue the dangerous journey without the responsibility for the lives of his friends, Aragorn leads the others after Merry and Pippin, who have been captured by the evil Orcs.');
INSERT INTO users (name, miniBio, bio) VALUES ('Boromir', 'The son of the Steward of Gondor...', 'Boromir is the son of the Steward of Gondor, the country\''s ruler since everyone believes there are no descendants of the original kings. usersrmed that Aragorn is, in fact, a descendant and the heir to the throne of Gondor, Boromir is at first indisposed toward the upstart. Besides, Boromir doesn\''t believe the Ring of Power should be destroyed. He tries to talk Elrond\''s Council, and later the Fellowship, into using the Ring to fight against Sauron, the one who originally made the Ring of Power and the rings it controls. Gandalf tries to explain that the ring answers only to Sauron and cannot be used for good, but Boromir continues to be tempted by the power of the ring. Overwhelmed by it, he tries to take the ring from Frodo, who runs away and sets out on his own for Mordor. Noble by nature, Boromir is horrified by what he has tried to do, and gives his life trying to save Merry and Pippin from the Orcs. Dying, Boromir acknowledges Aragorn as his king.');
INSERT INTO users (name, miniBio, bio) VALUES ('Legolas', 'The son of Thranduil, the King of the Elves...', 'Legolas Greenleaf is the son of Thranduil, the King of the Elves of Northern Mirkwood. It is Thranduil who names Bilbo Baggins as Elf friend. Legolas joins the Fellowship of the Ring, bringing his skill with bow and knives to the quest, as well as his enthusiasm for the battle. Present at Elrond\''s Council before the formation of the Fellowship, Legolas knows Gandalf, and seems to know Aragorn, as well. During the journey he forms an unexpectedly close friendship with Gimli son of Gloin, a Dwarf from the Lonely Mountains, also part of the Council. Since Gloin was once imprisoned by the father of Legolas, if Legolas and Gimli don\''t know each other directly, they should know OF one another.');
INSERT INTO users (name, miniBio, bio) VALUES ('Gimli', 'The son of Gloin, who was one of Bilbo\''s companions on Bilbo\''s first adventure...', 'Gimli is the son of Gloin, who was one of Bilbo\''s companions on Bilbo\''s first adventure (to steal treasure from a dragon). A sturdy Dwarf with a deadly axe, Gimli starts out not overly impressed with Legolas. It\''s when he meets the Elf Queen Galadriel that he seems to rethink his opinion of elves in general, and Legolas in particular. The friendship becomes so close that it is thought that Gimli accompanies Legolas when the elf finally takes ship to join his elven brethren in the Western lands over the Sea.');
INSERT INTO users (name, miniBio, bio) VALUES ('Merry', 'A hobbit who slips into the adventure...', 'Meriadoc Brandybuck, Merry to his friends, is a hobbit who slips into the adventure while running away with stolen vegetables, that is, if you believe the movie version. But as a member of the Fellowship Merry shows his steadfast soul.');
INSERT INTO users (name, miniBio, bio) VALUES ('Pippen', 'Follows his hobbit friends Merry, Sam and Frodo...', 'Peregrin "Pippin" Took follows his hobbit friends - Merry and Sam and Frodo - as a member of the Fellowship. As Gandalf reminds us, hobbits are remarkable creatures.');
INSERT INTO users (name, miniBio, bio) VALUES ('Elrond', 'The Lord of Imladris, also called Rivendell...', 'Elrond is the Lord of Imladris, also called Rivendell, a magnificent Elf city complete with libraries and museums. He was with Aragorn\''s ancestor Isildur when Isildur found the Ring of Power, but was unable to convince him to destroy it when they had the opportunity. Elrond has one of the Elf Rings, which the Ring of Power can control. Elrond understands that the time of the Elves is nearing its end, and that it\''s time to take his people to the western lands. Half-Elven, he has been given the choice between being human and being Elf. He chooses to be an Elf, and desperately wants his daughter Arwen to make that same choice and go with him to the western lands.');
INSERT INTO users (name, miniBio, bio) VALUES ('Arwen', 'Against the wishes of Elrond, her father, Arwen intends to choose to be mortal...', 'Against the wishes of Elrond, her father, Arwen intends to choose to be mortal, rather than to be an immortal Elf. What we never really understand is why she has to take that path just because she wants to marry Aragorn. He\''s an open-minded fellow, and doesn\''t seem to have anything against mixed marriages. Aragorn believes he\''s talked her out of choosing mortality, even though it means losing her when she goes with her people to the western lands. But Aragorn should really have known better. Arwen is a determined sort, and wins through all three books to marry her love, who has been crowned King Elessar of Gondor.');
INSERT INTO users (name, miniBio, bio) VALUES ('Celeborn', 'Elrond\''s father-in-law, and Arwen\''s grandfather...', 'Celeborn is Elrond\''s father-in-law, and Arwen\''s grandfather. His realm is Lothlorien, where Arwen lived for many years while Aragorn was growing up in Rivendell.');
INSERT INTO users (name, miniBio, bio) VALUES ('Galadriel', 'Celeborn\''s wife is Galadriel...', 'Celeborn\''s wife is Galadriel, and in the movie she seems to wear most of the power in the family. Coincidentally, she also wears one of the three Elf rings. Galadriel recognizes the no-win situation of the Elfs. If the Ring of Power goes to Sauron, then the world the Elves have created can be controlled and destroyed by him. If the Ring of Power is destroyed, then the power for good of her own ring will be gone, too, and she, and her world, will be diminished. Though tempted by the offer of the Ring of Power by Frodo, she recognizes that its use will always bring evil, and receives consolation in her own strength to refuse Frodo\''s offer. Her gifts to the Fellowship are essential to them in their quest. Her beauty and kindness to Gimli, a member of the race of Dwarves that have been at odds with the Elves for eons, brings her a gift in return - the sturdy Dwarf\''s heart.');
INSERT INTO users (name, miniBio, bio) VALUES ('Saruman', 'He SHOULD have been one of the good guys...', 'Saruman SHOULD have been one of the good guys; he was the master of Gandalf\''s order and trusted by the wizard. But too many long conversations with Sauron through the Palantir makes Saruman decide that he sees the writing on the virtual wall, and that the battle between good and evil is going to be Sauron\''s game. So Saruman switches sides. He offers his services to Sauron, who has him build an army of Orcs. Unfortunately for Saruman, he should have spent more time polishing his foretelling skills. Score: Sauron 0 - Fellowship Game.');
INSERT INTO users (name, miniBio, bio) VALUES ('Gollum', 'A River Creature originally, much like a hobbit...', 'A River Creature originally, much like a hobbit, Gollum has been totally transformed by his long, long ownership of the Ring of Power into a schizoid creature who has long conversations with himself. At least he has ONE friend. He follows Frodo in hopes of getting back "his Precious." Truly a creepy character.');
    `;
    await client.query(SQL);
}

const setUp = async() => {
    try {
        await client.connect();
        await syncAndSeed();
        console.log('connected to database');
        
    }
    catch(err) {
        console.log(err);
    }
}

setUp();