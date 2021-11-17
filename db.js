// DEALERS CHOICE : SEQUELIZE

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/lotr'); // connection to your db
const { DataTypes: { STRING, UUID, UUIDV4 } } = Sequelize;

// CREATE MODELS:

const Character = conn.define('character', {
    id: { 
        type: UUID, //
        defaultValue: UUIDV4,
        primaryKey: true
    }, 
    name: {
        type: STRING(50),
        unique: true,
        allowNull: false
    }
})

// const Info = conn.define('info', {
//     id: { 
//         type: UUID, //
//         defaultValue: UUIDV4,
//         primaryKey: true
//     }, 
//     miniBio: {
//         type: STRING(1000),
//         unique: true,
//         allowNull: false
//     }
// })

const Description = conn.define('description', {
    id: { 
        type: UUID, //
        defaultValue: UUIDV4,
        primaryKey: true
    }, 
    bio: {
        type: STRING(2000),
        unique: true,
        allowNull: false
    }
})

// Info.belongsTo(Character);
Description.belongsTo(Character);
Character.belongsTo(Character, { as: 'companion' })
// Character.hasMany(Character, { foreignKey: 'fellowship-members'}) 


// put updates database
// post take info form browser and send to db -- use .save() to save to db

const data = {
    name: ['Gandalf', 'Bilbo', 'Frodo', 'Sam', 'Aragorn', 'Boromir', 'Legolas', 'Gimli', 'Merry', 'Pippen', 'Elrond', 'Arwen', 'Celeborn', 'Galadriel', 'Saruman', 'Gollum'],
    miniBio: ['A wizard, the first leader of the Fellowship...', 'A strange and wonderful hobbit...', 'The Ring-Bearer...', 'A hobbit, is Frodo\'s gardener, and dear friend...', 'Also known as Strider, is a descendant of the human king...', 'The son of the Steward of Gondor...', 'The son of Thranduil, the King of the Elves...', 'The son of Gloin, who was one of Bilbo\'s companions on Bilbo\'s first adventure...', 'A hobbit who slips into the adventure...', 'Follows his hobbit friends Merry, Sam and Frodo...', 'The Lord of Imladris, also called Rivendell...', 'Against the wishes of Elrond, her father, Arwen intends to choose to be mortal...', 'Elrond\'s father-in-law, and Arwen\'s grandfather...', 'Celeborn\'s wife is Galadriel...', 'He SHOULD have been one of the good guys...', 'A River Creature originally, much like a hobbit...', 'Samwise Gamgee, a hobbit, is Frodo\'s gardener, and dear friend. Sam insists on accompanying his friend on his dangerous trip. Sam becomes one of the Fellowship of the Ring, and is the only one to remain with Frodo all the way to the end.', 'Aragorn, also known as Strider, is a descendant of the human king who was too weak to destroy the Ring of Power when it came into his hands. Raised by the Elf King Elrond in Rivendell after the death of his parents, Aragorn learns as an adult that he is heir to the throne of Gondor. He also learns that he loves Elrond\'s daughter Arwen. Aragorn joins the Fellowship of the Ring but, after Frodo secretly leaves the Fellowship to continue the dangerous journey without the responsibility for the lives of his friends, Aragorn leads the others after Merry and Pippin, who have been captured by the evil Orcs.'],
    bio: [['Gandalf the Grey is a wizard, the first leader of the Fellowship, and the possessor of one of the three Elf rings which can be controlled by the Ring of Power. Whether he\'s really been killed by the Balrog, a monster of fire, or not, like the Terminator and like Spock, Gandalf will come back. But this time, our white knight switches to a more appropriate costume as "Gandalf the White."'], 
    ['Bilbo Baggins is a strange and wonderful hobbit. Unlike the other happy hobbits, Bilbo enjoys adventures. His first one was with Gandalf and a group of dwarves, one of them being Gimli\'s father, Gloin. He also spent two weeks hiding in the palace of Legolas\'s father, while trying to come up with a plan for freeing his dwarf friends. Bilbo finds the Ring of Power on that trip, and keeps the ring a secret for decades, seemingly not aging over that time. It\'s only when he feels old and "thin" that Bilbo recognizes it\'s time to go on a last adventure - to visit again the Elves of Rivendell. Pushed hard by Gandalf, Bilbo leaves the Ring behind for his heir and cousin, Frodo Baggins.'], 
    ['Frodo is the Ring-Bearer. Inheriting the Ring of Power from his cousin Bilbo, Frodo learns from Gandalf that the ring is about to bring its evil to the gentle beauty of the Shire if it remains there. Frodo accepts the responsibility for destroying the ring in the fires of Mordor, the evil location from which it came. He\'s accompanied on this dangerous quest by the Fellowship of the Ring - Gandalf, Aragorn, Boromir, Legolas, Gimli, Sam, Merry and Pippin.'],
    ['Samwise Gamgee, a hobbit, is Frodo\'s gardener, and dear friend. Sam insists on accompanying his friend on his dangerous trip. Sam becomes one of the Fellowship of the Ring, and is the only one to remain with Frodo all the way to the end.'], 
    ['Aragorn, also known as Strider, is a descendant of the human king who was too weak to destroy the Ring of Power when it came into his hands. Raised by the Elf King Elrond in Rivendell after the death of his parents, Aragorn learns as an adult that he is heir to the throne of Gondor. He also learns that he loves Elrond\'s daughter Arwen. Aragorn joins the Fellowship of the Ring but, after Frodo secretly leaves the Fellowship to continue the dangerous journey without the responsibility for the lives of his friends, Aragorn leads the others after Merry and Pippin, who have been captured by the evil Orcs.'], 
    ['Boromir is the son of the Steward of Gondor, the country\'s ruler since everyone believes there are no descendants of the original kings. usersrmed that Aragorn is, in fact, a descendant and the heir to the throne of Gondor, Boromir is at first indisposed toward the upstart. Besides, Boromir doesn\'t believe the Ring of Power should be destroyed. He tries to talk Elrond\'s Council, and later the Fellowship, into using the Ring to fight against Sauron, the one who originally made the Ring of Power and the rings it controls. Gandalf tries to explain that the ring answers only to Sauron and cannot be used for good, but Boromir continues to be tempted by the power of the ring. Overwhelmed by it, he tries to take the ring from Frodo, who runs away and sets out on his own for Mordor. Noble by nature, Boromir is horrified by what he has tried to do, and gives his life trying to save Merry and Pippin from the Orcs. Dying, Boromir acknowledges Aragorn as his king.'], 
    ['Legolas Greenleaf is the son of Thranduil, the King of the Elves of Northern Mirkwood. It is Thranduil who names Bilbo Baggins as Elf friend. Legolas joins the Fellowship of the Ring, bringing his skill with bow and knives to the quest, as well as his enthusiasm for the battle. Present at Elrond\'s Council before the formation of the Fellowship, Legolas knows Gandalf, and seems to know Aragorn, as well. During the journey he forms an unexpectedly close friendship with Gimli son of Gloin, a Dwarf from the Lonely Mountains, also part of the Council. Since Gloin was once imprisoned by the father of Legolas, if Legolas and Gimli don\'t know each other directly, they should know OF one another.'], 
    ['Gimli is the son of Gloin, who was one of Bilbo\'s companions on Bilbo\'s first adventure (to steal treasure from a dragon). A sturdy Dwarf with a deadly axe, Gimli starts out not overly impressed with Legolas. It\'s when he meets the Elf Queen Galadriel that he seems to rethink his opinion of elves in general, and Legolas in particular. The friendship becomes so close that it is thought that Gimli accompanies Legolas when the elf finally takes ship to join his elven brethren in the Western lands over the Sea.'], 
    ['Meriadoc Brandybuck, Merry to his friends, is a hobbit who slips into the adventure while running away with stolen vegetables, that is, if you believe the movie version. But as a member of the Fellowship Merry shows his steadfast soul.'], 
    ['Peregrin "Pippin" Took follows his hobbit friends - Merry and Sam and Frodo - as a member of the Fellowship. As Gandalf reminds us, hobbits are remarkable creatures.'], 
    ['Elrond is the Lord of Imladris, also called Rivendell, a magnificent Elf city complete with libraries and museums. He was with Aragorn\'s ancestor Isildur when Isildur found the Ring of Power, but was unable to convince him to destroy it when they had the opportunity. Elrond has one of the Elf Rings, which the Ring of Power can control. Elrond understands that the time of the Elves is nearing its end, and that it\'s time to take his people to the western lands. Half-Elven, he has been given the choice between being human and being Elf. He chooses to be an Elf, and desperately wants his daughter Arwen to make that same choice and go with him to the western lands.'], 
    ['Against the wishes of Elrond, her father, Arwen intends to choose to be mortal, rather than to be an immortal Elf. What we never really understand is why she has to take that path just because she wants to marry Aragorn. He\'s an open-minded fellow, and doesn\'t seem to have anything against mixed marriages. Aragorn believes he\'s talked her out of choosing mortality, even though it means losing her when she goes with her people to the western lands. But Aragorn should really have known better. Arwen is a determined sort, and wins through all three books to marry her love, who has been crowned King Elessar of Gondor.'], 
    ['Celeborn is Elrond\'s father-in-law, and Arwen\'s grandfather. His realm is Lothlorien, where Arwen lived for many years while Aragorn was growing up in Rivendell.'], 
    ['Celeborn\'s wife is Galadriel, and in the movie she seems to wear most of the power in the family. Coincidentally, she also wears one of the three Elf rings. Galadriel recognizes the no-win situation of the Elfs. If the Ring of Power goes to Sauron, then the world the Elves have created can be controlled and destroyed by him. If the Ring of Power is destroyed, then the power for good of her own ring will be gone, too, and she, and her world, will be diminished. Though tempted by the offer of the Ring of Power by Frodo, she recognizes that its use will always bring evil, and receives consolation in her own strength to refuse Frodo\'s offer. Her gifts to the Fellowship are essential to them in their quest. Her beauty and kindness to Gimli, a member of the race of Dwarves that have been at odds with the Elves for eons, brings her a gift in return - the sturdy Dwarf\'s heart.'], 
    ['Saruman SHOULD have been one of the good guys; he was the master of Gandalf\'s order and trusted by the wizard. But too many long conversations with Sauron through the Palantir makes Saruman decide that he sees the writing on the virtual wall, and that the battle between good and evil is going to be Sauron\'s game. So Saruman switches sides. He offers his services to Sauron, who has him build an army of Orcs. Unfortunately for Saruman, he should have spent more time polishing his foretelling skills. Score: Sauron 0 - Fellowship Game.'], 
    ['A River Creature originally, much like a hobbit, Gollum has been totally transformed by his long, long ownership of the Ring of Power into a schizoid creature who has long conversations with himself. At least he has ONE friend. He follows Frodo in hopes of getting back "his Precious." Truly a creepy character.']]
}

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [gandalf, bilbo, frodo, sam, aragorn, boromir, legolas, gimli, merry, pippen, elrond, arwen, celeborn, galadriel, saruman, gollum] = await Promise.all(
        data.name.map(name => Character.create({ name: name, miniBio: data.miniBio[0]})),
    )
    // const [minibio1, minibio2, minibio3, minibio4, minibio5, minibio6, minibio7, minibio8, minibio9, minibio10, minibio11, minibio12, minibio13, minibio14, minibio15, minibio16] = await Promise.all(
    //     data.miniBio.map(mini => Info.create({ miniBio: mini}))
    // )
    const [bio1, bio2, bio3, bio4, bio5, bio6, bio7, bio8, bio9, bio10, bio11, bio12, bio13, bio14, bio15, bio16] = await Promise.all(
        data.bio.map(bio => Description.create({ bio: bio.pop()}))
    )
    
    bio1.characterId = gandalf.id
    bio2.characterId = bilbo.id
    bio3.characterId = frodo.id
    bio4.characterId = sam.id
    bio5.characterId = aragorn.id
    bio6.characterId = boromir.id
    bio7.characterId = legolas.id
    bio8.characterId = gimli.id
    bio9.characterId = merry.id
    bio10.characterId = pippen.id
    bio11.characterId = elrond.id
    bio12.characterId = arwen.id
    bio13.characterId = celeborn.id
    bio14.characterId = galadriel.id
    bio15.characterId = saruman.id
    bio16.characterId = gollum.id

    gandalf.companionId = bilbo.id
    bilbo.companionId = gandalf.id

    frodo.companionId = sam.id
    sam.companionId = frodo.id

    merry.companionId = pippen.id
    pippen.companionId = merry.id

    legolas.companionId = gimli.id
    gimli.companionId = legolas.id

    aragorn.companionId = arwen.id
    arwen.companionId = aragorn.id

    celeborn.companionId = galadriel.id
    galadriel.companionId = celeborn.id


    await Promise.all([
        bio1.save(), bio2.save(), bio3.save(), bio4.save(), bio5.save(), bio6.save(), bio7.save(), bio8.save(), bio9.save(), bio10.save(), bio11.save(), bio12.save(), bio13.save(), bio14.save(), bio15.save(), bio16.save(), gandalf.save(), bilbo.save(), frodo.save(), sam.save(), aragorn.save(), arwen.save()
    ])
    // console.log(aragorn.get())
    // console.log(bio5.get())
};

module.exports = {
    syncAndSeed,
    models: {
        Character,
        Description
    }
}