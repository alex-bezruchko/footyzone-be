exports.seed = function(knex, Promise) {
  return knex('posts')
    .truncate()
    .then(function() {
      return knex('posts').insert([
        {
          user_id: 1,
          title:
            'I wish thee ring hd never come to me. I wish none of this had happened.',
          body: 'Everton have reppportedly entered the bidding for Bournemouth and England star Callum Wilson. Marco Silva is intent on adding a reliable goalscorer this summer and appears to have centred on Wilson.',
          category_id: 3
        },
        {
          user_id: 1,
          title: 'I think we should get off the road. Get off the road! Quick!',
          body: 'De Ligt is yet to clarify his future but appears to have his sights set on Juventus after revealing the club are interested and a desire to play alongside some of their defenders.',
          category_id: 1
        },
        { user_id: 1, 
          title: 'Our business is our own.', 
          body: 'Solskjaer is planning for the future at Old Trafford after being confirmed as the clubs full-time manager, and knows he will have a substantial budget to buy new playerss',
          category_id: 2 
        },
        { user_id: 1, 
          title: 'Can you protect me from yourself?', 
          body: 'Declan Rice is one of the bright new stars in Gareth Southgate`s England set-up. JAMIE REDKNAPP caught up with the West Ham United midfielder at Forman`s, a restaurant close to the London Stadium, just seven days after his England debut to talk about his remarkable rise. James Restall listened in.',
          category_id: 1 
        },
        { user_id: 2, title: "I ain't been droppin' no eaves, sir! Promise!" }, // 5
        { user_id: 2, title: "Of course you are, and I'm coming with you!" }, // 6
        {
          user_id: 2,
          title:
            "I made a promise, Mr Frodo. A promise. \"Don't you leave him Samwise Gamgee.\" And I don't mean to. I don't mean to.",
        }, // 7
        {
          user_id: 2,
          title:
            " N-nothing important. That is, I heard a great deal about a ring, a Dark Lord, and something about the end of the world, but... Please, Mr. Gandalf, sir, don't hurt me. Don't turn me into anything... unnatural.",
        }, // 8
        { user_id: 3, title: 'Well, that rules you out, Pip.' }, // 9
        { user_id: 4, title: "We've had one yes. What about second breakfast?" }, // 10
        {
          user_id: 4,
          title:
            'You need people of intelligence on this sort of mission...quest...thing.',
        }, // 11
        {
          user_id: 5,
          title:
            'A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.',
        },
        {
          user_id: 5,
          title:
            'One ring to rule them all. One ring to find them. One ring to bring them all and in the darkness bind them!',
        },
        { user_id: 5, title: 'Is it secret?! Is it safe?!' },
        {
          user_id: 5,
          title:
            'A Balrog. A demon of the ancient world. This foe is beyond any of you. Run!',
        },
        { user_id: 5, title: 'When in doubt, follow your nose.' }, // 16
        { user_id: 5, title: 'YOU SHALL NOT PASS!' }, // 17
        { user_id: 5, title: 'Fly you fools!' }, // 18
        {
          user_id: 5,
          title:
            'All you have to do is decide what to do with the time that is given to you.',
        }, // 19
        {
          user_id: 5,
          title:
            'Do not be so quick to deal out death and judgement. Even the very wise do not see all ends.',
        }, // 20
        {
          user_id: 5,
          title:
            ' Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
        }, // 21
        {
          user_id: 6,
          title:
            'One does not simply walk into Mordor. Its black gates are guarded by more than just orcs. There is evil there that does not sleep. And the Great Eye, is ever watchful. It is a barren wasteland, riddled with fire, ash and dust. The very air you breathe is a poisonous fume. Not with ten thousand men could you do this. It is folly!',
        },
        {
          user_id: 6,
          title:
            'It is a strange fate that we should suffer so much fear and doubt over so small a thing. Such a little thing.',
        },
        { user_id: 6, title: 'Gondor has no king, Gondor needs no king.' },
        {
          user_id: 7,
          title:
            'Lembas! Elvish waybread. One small bite is enough to fill a stomach of a grown man.',
        },
        {
          user_id: 7,
          title:
            'This is no mere Ranger. He is Aragorn, son of Arathorn. You owe him your allegiance.',
        },
        {
          user_id: 7,
          title:
            'Have you heard nothing what Lord Elrond has said? The ring must be destroyed!',
        },
        { user_id: 8, title: 'Nobody tosses a Dwarf!' }, // 28
        {
          user_id: 8,
          title:
            'I will be dead before I see the ring in the hands of an elf! Never trust an elf!',
        }, // 29
        { user_id: 8, title: "And I suppose you think you're the one to do it!" }, // 30
        {
          user_id: 8,
          title:
            'I have been dealt a wound beyond all healing, for I have looked the last... upon that which was fairest. Henceforth I will call nothing fair unless it be her gift to me.',
        },
        {
          user_id: 8,
          title: 'I asked for one hair from her golden head... she gave me three.',
        }, // 32
        {
          user_id: 9,
          title:
            "We will not abandon Merry and Pippin to torment and death. Not while we have strength left. Leave all that can be spared behind. We travel light. Let's hunt some orc.",
        },
        {
          user_id: 9,
          title:
            'You cannot wield it! None of us can! The One Ring answers to Sauron alone. It has no other master.',
        },
        {
          user_id: 9,
          title: "You draw too much attention to yourself, 'Mister Underhill'.",
        }, // 35
        {
          user_id: 9,
          title: "A little more caution from you, that's no trinket you carry.",
        }, // 36
        {
          user_id: 9,
          title:
            'I would have gone with you to the end, into the very fires of Mordor.',
        }, // 37
        {
          user_id: 9,
          title:
            'Indeed. I can avoid being seen, if I wish, but to disappear entirely, that is a rare gift.',
        },
      ]);
    })
  };
