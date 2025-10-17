import type { GameEvent } from '../types';

export const ALL_EVENTS: GameEvent[] = [
    // --- INFANCY (0-3 Years / 0-47 months) ---
    {
        eventId: 'infant_vaccination',
        description: 'It\'s time for your routine vaccinations. The doctor approaches with a needle.',
        condition: (c) => c.age >= 2 && c.age <= 24 && [2, 4, 6, 12, 18, 24].includes(c.age),
        eventType: 'monthly',
        choices: [
            { text: 'Cry your lungs out.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You scream and cry, but the shot is over quickly. Your parent comforts you.', happinessChange: -10, healthChange: 5 } }] },
            { text: 'Try to be brave.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You clench your fists and barely make a peep. Your parent is so proud of their brave little baby.', happinessChange: 5, healthChange: 5, moralChange: 2 } }] },
            { text: 'Bite the doctor.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You nip the doctor\'s hand! They are startled, and your parent scolds you. You still get the shot.', happinessChange: -15, karmaChange: -5, healthChange: 5 } }] },
        ]
    },
    {
        eventId: 'infant_first_smile',
        description: 'Your mother is making silly faces at you, trying to get you to smile.',
        condition: (c) => c.age === 2,
        eventType: 'monthly',
        choices: [
            { text: 'Gurgle.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You watch her intently, letting out a little gurgle.', happinessChange: 2 } }] },
            { text: 'Flash a gummy smile.', outcomes: [{ probability: 1.0, outcome: { narrative: 'A wide, gummy smile spreads across your face! Your mother melts and covers you in kisses.', happinessChange: 20, relationshipChange: { npcId: 'mother', change: 10 } } }] },
        ]
    },
    {
        eventId: 'infant_rolls_over',
        description: 'You\'re lying on your tummy and feel the urge to see what\'s on the other side.',
        condition: (c) => c.age >= 4 && c.age <= 6,
        eventType: 'monthly',
        choices: [
            { text: 'Push with your arms.', outcomes: [{ probability: 0.6, outcome: { narrative: 'You push and wiggle until you flop over onto your back! A whole new world!', happinessChange: 15, smartsChange: 1 } }, { probability: 0.4, outcome: { narrative: 'You try, but just end up face-planting into the blanket. It\'s tiring work.', happinessChange: -5 } }] },
            { text: 'Just lay there.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide tummy time is fine for now and continue staring at the carpet fibers.', happinessChange: -2 } }] },
        ]
    },
    {
        eventId: 'infant_learn_crawl',
        description: 'You see a colorful toy just out of reach. You feel an urge to move towards it.',
        condition: (c) => c.age >= 6 && c.age <= 10,
        eventType: 'monthly',
        choices: [
            { text: 'Wiggle with all your might.', outcomes: [{ probability: 0.7, outcome: { narrative: 'You push with your legs and pull with your arms, suddenly you are moving forward! You\'re crawling!', happinessChange: 15, smartsChange: 2 } }, { probability: 0.3, outcome: { narrative: 'You just end up wiggling in place. The toy seems so far away.', happinessChange: -5 } }] },
            { text: 'Cry for the toy.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You let out a loud cry, and one of your parents brings the toy to you. Easy peasy.', happinessChange: 5, smartsChange: -1 } }] },
        ]
    },
    {
        eventId: 'infant_learn_walk',
        description: 'Your parent is holding their hands out, encouraging you to take your first steps.',
        condition: (c) => c.age >= 9 && c.age <= 16,
        eventType: 'monthly',
        choices: [
            { text: 'Take a wobbly step.', outcomes: [{ probability: 0.6, outcome: { narrative: 'You let go of the couch and stumble forward into your parent\'s arms! You\'re walking!', happinessChange: 25, smartsChange: 3 } }, { probability: 0.4, outcome: { narrative: 'You take one step and fall flat on your diaper. It doesn\'t hurt, but it\'s frustrating.', happinessChange: -5 } }] },
            { text: 'Sit down defiantly.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide sitting is much safer and plop back down on the floor.', happinessChange: -2 } }] },
        ]
    },
    {
        eventId: 'infant_first_word',
        description: 'Your parents keep repeating a word to you. You try to mimic the sound.',
        condition: (c) => c.age >= 10 && c.age <= 18,
        eventType: 'monthly',
        choices: [
            { text: 'Try to say "Mama".', outcomes: [{ probability: 1.0, outcome: { narrative: 'You babble for a bit and then... "MAMA!" Your mother is overjoyed!', happinessChange: 15, relationshipChange: { npcId: 'mother', change: 10 } } }] },
            { text: 'Try to say "Dada".', outcomes: [{ probability: 1.0, outcome: { narrative: 'You concentrate and manage to say "DADA!" Your father scoops you up in a hug.', happinessChange: 15, relationshipChange: { npcId: 'father', change: 10 } } }] },
            { text: 'Giggle and drool.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You just giggle and blow a spit bubble. Words are hard.', smartsChange: -1 } }] },
        ]
    },
    {
        eventId: 'infant_try_new_food',
        description: 'Your parent is trying to feed you mashed peas for the first time.',
        condition: (c) => c.age >= 4 && c.age <= 9,
        eventType: 'monthly',
        choices: [
            { text: 'Eat it eagerly.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You gobble up the peas. They taste strange but good! Your parent is pleased.', happinessChange: 5, healthChange: 1 } }] },
            { text: 'Spit it out.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You take one taste and immediately spit the green mush all over your parent. They are not amused.', happinessChange: -5, relationshipChange: { npcId: 'mother', change: -3 } } }] },
            { text: 'Make a mess.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You smear the peas all over your face, your hair, and the high chair. It\'s great fun!', happinessChange: 10, smartsChange: -1 } }] },
        ]
    },
    {
        eventId: 'infant_peekaboo',
        description: 'Your father hides his face behind his hands and then reveals himself with a cheerful "Peek-a-boo!"',
        condition: (c) => c.age >= 6 && c.age <= 12,
        eventType: 'monthly',
        choices: [
            { text: 'Giggle.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You erupt in a fit of giggles. It\'s the funniest thing you\'ve ever seen!', happinessChange: 15, relationshipChange: { npcId: 'father', change: 5 } } }] },
            { text: 'Stare blankly.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You just stare at him, unimpressed. He seems a little disappointed.', happinessChange: -2 } }] },
            { text: 'Cry.', outcomes: [{ probability: 1.0, outcome: { narrative: 'The sudden reappearance of his face startles you, and you begin to cry.', happinessChange: -10 } }] },
        ]
    },
    {
        eventId: 'infant_gets_gift',
        description: 'Your parents surprise you with a brand new toy!',
        condition: (c) => c.age >= 6 && c.age <= 36,
        eventType: 'monthly',
        choices: [
            { text: 'Play with the toy.', outcomes: [{ probability: 1.0, outcome: { narrative: 'It\'s a wonderful toy! You spend the rest of the day playing with it.', happinessChange: 20 } }] },
            { text: 'Play with the box instead.', outcomes: [{ probability: 1.0, outcome: { narrative: 'The toy is okay, but the box it came in is fascinating! Your parents sigh.', happinessChange: 10, smartsChange: 1 } }] },
        ]
    },
    {
        eventId: 'infant_sickness',
        description: 'You wake up feeling hot and fussy, with a runny nose.',
        condition: (c) => c.age >= 3 && c.age <= 36,
        eventType: 'monthly',
        choices: [
            { text: 'Cry to get attention.', outcomes: [{ probability: 1.0, outcome: { narrative: 'Your crying alerts your parents. They check your temperature and give you some medicine. You start to feel a bit better.', healthChange: -5 } }] },
            { text: 'Try to sleep it off.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You manage to fall back asleep, but when you wake up you feel even worse.', healthChange: -10, newAilmentId: 'common_cold' } }, { probability: 0.5, outcome: { narrative: 'A little more sleep was all you needed. You wake up feeling fine.', healthChange: -2 } }] },
        ]
    },
    {
        eventId: 'infant_tantrum',
        description: 'Your parent says you can\'t have a cookie before dinner. You feel a surge of rage.',
        condition: (c) => c.age >= 18 && c.age <= 47,
        eventType: 'monthly',
        choices: [
            { text: 'Throw yourself on the floor.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You have a full-blown tantrum, kicking and screaming on the floor. You don\'t get the cookie, and now everyone is upset.', happinessChange: -15, relationshipChange: { npcId: 'mother', change: -5 } } }] },
            { text: 'Accept their decision.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You are disappointed, but you accept it. Your parent praises you for being so mature.', happinessChange: 5, moralChange: 5, relationshipChange: { npcId: 'mother', change: 5 } } }] },
            { text: 'Sneak a cookie later.', outcomes: [{ probability: 0.4, outcome: { narrative: 'You wait until your parent isn\'t looking and snatch a cookie! It tastes like victory.', happinessChange: 10, moralChange: -5 } }, { probability: 0.6, outcome: { narrative: 'You get caught with your hand in the cookie jar. Now you\'re in time-out.', happinessChange: -20 } }] },
        ]
    },
    {
        eventId: 'infant_bedtime_story',
        description: 'Your mother is reading you a bedtime story about friendly animals.',
        condition: (c) => c.age >= 12 && c.age < 4 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Listen quietly.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You listen intently to the story until you drift off to sleep. You feel safe and loved.', happinessChange: 10, relationshipChange: { npcId: 'mother', change: 3 } } }] },
            { text: 'Keep interrupting.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You keep interrupting with questions about the story. Your mother patiently answers them.', smartsChange: 2, happinessChange: 5 } }] },
            { text: 'Chew on the book.', outcomes: [{ probability: 1.0, outcome: { narrative: 'The book looks delicious. You try to take a bite out of it. Your mother takes it away.', happinessChange: -5, smartsChange: -1 } }] },
        ]
    },
    {
        eventId: 'infant_sibling_interaction',
        description: 'Your sibling is trying to play with you.',
        condition: (c) => c.age >= 12 && c.age < 4 * 12 && c.npcs.some(n => n.relationshipType === 'Brother' || n.relationshipType === 'Sister'),
        eventType: 'monthly',
        choices: [
            { text: 'Play along happily.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You and your sibling have a wonderful time playing together.', happinessChange: 10, relationshipChange: { npcId: 'sibling_0', change: 10 } } }] },
            { text: 'Ignore them.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You are not in the mood to play and ignore your sibling. They seem hurt.', happinessChange: -2, relationshipChange: { npcId: 'sibling_0', change: -5 } } }] },
            { text: 'Pull their hair.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You reach out and pull their hair. They start crying, and you get in trouble.', happinessChange: -10, relationshipChange: { npcId: 'sibling_0', change: -10 }, karmaChange: -3 } }] },
        ]
    },
    {
        eventId: 'toddler_scribbles_on_wall',
        description: 'You find a bright red crayon and an empty stretch of wall. It seems like a perfect canvas.',
        condition: (c) => c.age >= 24 && c.age < 4 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Create a masterpiece.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You scribble all over the wall. Your parents are furious and spend the next hour cleaning it off.', happinessChange: -20, relationshipChange: { npcId: 'father', change: -8 } } }] },
            { text: 'Eat the crayon.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide the crayon looks tastier than the wall. It doesn\'t taste good. Your parent has to fish the waxy bits out of your mouth.', happinessChange: -10, healthChange: -1 } }] },
            { text: 'Draw on paper instead.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You find a piece of paper and draw on that instead. Your parents praise your creativity.', happinessChange: 10, smartsChange: 2 } }] },
        ]
    },
    {
        eventId: 'toddler_potty_training',
        description: 'Your parent places you on a small plastic toilet and makes encouraging noises.',
        condition: (c) => c.age >= 24 && c.age < 4 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Use the potty.', outcomes: [{ probability: 0.5, outcome: { narrative: 'Success! You used the potty! Your parents celebrate like you\'ve won a gold medal.', happinessChange: 25, smartsChange: 2 } }, { probability: 0.5, outcome: { narrative: 'You sit there for a while, but nothing happens. Maybe next time.', happinessChange: -5 } }] },
            { text: 'Have an accident on the floor.', outcomes: [{ probability: 1.0, outcome: { narrative: 'The second you get off the potty, you have an accident on the rug. Your parent sighs.', happinessChange: -10 } }] },
            { text: 'Put a toy in the potty.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide your toy car needs to use the potty more than you do. Your parent is not amused.', happinessChange: -5, smartsChange: -1 } }] },
        ]
    },
    {
        eventId: 'toddler_learns_no',
        description: 'Your parent asks you to put your toys away. You feel a new word bubbling up inside you.',
        condition: (c) => c.age >= 20 && c.age < 3 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Shout "NO!"', outcomes: [{ probability: 1.0, outcome: { narrative: 'You shout "NO!" at the top of your lungs. It feels powerful! Your parent looks stunned.', happinessChange: 10, moralChange: -3 } }] },
            { text: 'Do as you\'re told.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You quietly put your toys away.', happinessChange: -2, moralChange: 3 } }] },
        ]
    },
    {
        eventId: 'toddler_runs_away_store',
        description: 'While at the grocery store, you see the colorful cereal aisle and make a run for it.',
        condition: (c) => c.age >= 30 && c.age < 5 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Bolt!', outcomes: [{ probability: 0.7, outcome: { narrative: 'You dash away, giggling, as your parent frantically chases you down. You get a stern talking to.', happinessChange: 5, moralChange: -2 } }, { probability: 0.3, outcome: { narrative: 'You get lost in the aisles for a moment. It\'s scary until your parent finds you. They look very relieved and a little angry.', happinessChange: -15 } }] },
            { text: 'Ask to go to the cereal aisle.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You ask your parent, and they agree to take you. They even buy you your favorite kind!', happinessChange: 15, smartsChange: 1 } }] },
        ]
    },

    // --- CHILDHOOD (4-12 Years) ---
    {
        eventId: 'child_first_day_school',
        description: 'Your parent walks you to the door of your new classroom. It\'s your first day of elementary school.',
        condition: (c) => c.age === 5 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Cry and cling to your parent.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You don\'t want them to leave! You cry, but they eventually go. It takes a while to calm down.', happinessChange: -20 } }] },
            { text: 'Wave goodbye bravely.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You give your parent a hug and bravely walk into the classroom. You\'re a little nervous but excited.', happinessChange: 10, moralChange: 3 } }] },
            { text: 'Run in and start playing.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You don\'t even look back! There are too many new toys to play with. You make a few friends immediately.', happinessChange: 15, charismaChange: 5 } }] },
        ]
    },
    {
        eventId: 'child_make_friend',
        description: 'At the playground, you see another kid playing alone. They look friendly.',
        condition: (c) => c.age >= 3 * 12 && c.age < 6 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Go say hello.', outcomes: [{ probability: 0.8, outcome: { narrative: 'You introduce yourself, and you both start playing together. You made a new friend!', happinessChange: 15, charismaChange: 5 } }, { probability: 0.2, outcome: { narrative: 'You try to say hi, but they ignore you and run away. How rude!', happinessChange: -10 } }] },
            { text: 'Keep playing by yourself.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide to just keep doing your own thing. Maybe another time.', happinessChange: -2 } }] },
        ]
    },
    {
        eventId: 'child_toy_fight',
        description: 'Another kid in your preschool class snatches the toy truck you were playing with.',
        condition: (c) => c.age >= 3 * 12 && c.age < 6 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Grab it back.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You get into a tug-of-war. The teacher has to separate you both. You feel angry.', happinessChange: -10, karmaChange: -3 } }] },
            { text: 'Tell the teacher.', outcomes: [{ probability: 1.0, outcome: { narrative: 'The teacher makes the other kid give it back. You feel vindicated.', happinessChange: 5, moralChange: 2 } }] },
            { text: 'Find another toy.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide it\'s not worth fighting over and find something else to play with.', happinessChange: 2, moralChange: 5 } }] },
        ]
    },
    {
        eventId: 'child_draw_picture',
        description: 'You have some crayons and a piece of paper. You decide to draw a picture for your parents.',
        condition: (c) => c.age >= 3 * 12 && c.age < 7 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Draw your family.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You draw a colorful picture of your family. Your parents love it and hang it on the fridge.', happinessChange: 15, relationshipChange: { npcId: 'mother', change: 5 } } }] },
            { text: 'Draw a scary monster.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You draw a big, scary monster with lots of teeth. Your parents look a little concerned but say it\'s very creative.', happinessChange: 5, smartsChange: 2 } }] },
        ]
    },
     {
        eventId: 'child_scraped_knee',
        description: 'While running around at the park, you trip and scrape your knee. It starts to bleed.',
        condition: (c) => c.age >= 3 * 12 && c.age < 8 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Cry for your parents.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You let out a wail. Your parent rushes over, cleans your knee, and gives you a colorful bandage. The hug makes it feel better.', happinessChange: -5, healthChange: -2, relationshipChange: { npcId: 'mother', change: 3 } } }] },
            { text: 'Try to be tough.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You bite your lip to stop from crying. It stings, but you stand up and brush yourself off.', happinessChange: 2, moralChange: 3, healthChange: -3 } }] },
            { text: 'Rub some dirt on it.', outcomes: [{ probability: 0.8, outcome: { narrative: 'You try to rub dirt on it like you saw in a movie, but it just makes it hurt more and get dirty.', happinessChange: -8, healthChange: -5 } }, { probability: 0.2, outcome: { narrative: 'You rub some dirt on it and feel surprisingly tough. The bleeding stops.', happinessChange: 5, healthChange: -2 } }] },
        ]
    },
    {
        eventId: 'child_break_vase',
        description: 'While running through the house, you accidentally knock over and break a vase.',
        condition: (c) => c.age >= 4 * 12 && c.age < 10 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Blame your sibling.', outcomes: [{ probability: 0.5, outcome: { narrative: 'Your parents believe you and scold your sibling. You got away with it, but you feel guilty.', happinessChange: -10, moralChange: -10, karmaChange: -10 } }, { probability: 0.5, outcome: { narrative: 'Your sibling proves their innocence, and you get in double trouble for breaking the vase and for lying!', happinessChange: -25, moralChange: -15, karmaChange: -5 } }] },
            { text: 'Tell the truth.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You confess to your parents. They are disappointed but appreciate your honesty. You are grounded for a week.', happinessChange: -10, moralChange: 10, karmaChange: 5 } }] },
            { text: 'Hide the pieces.', outcomes: [{ probability: 0.3, outcome: { narrative: 'You hide the broken pieces under the rug. No one ever finds out.', happinessChange: 5, moralChange: -8 } }, { probability: 0.7, outcome: { narrative: 'Your mom finds the broken pieces while vacuuming. You get in big trouble.', happinessChange: -20, moralChange: -5 } }] },
        ]
    },
    {
        eventId: 'child_found_money',
        description: 'While walking home from school, you spot a wallet on the ground.',
        condition: (c) => c.age >= 6 * 12 && c.age < 12 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Try to find the owner.', outcomes: [{ probability: 0.7, outcome: { narrative: 'You find an ID and return the wallet. The owner is grateful and gives you a small reward.', happinessChange: 10, wealthChange: 20, karmaChange: 10, moralChange: 10 } }, { probability: 0.3, outcome: { narrative: 'You can\'t find the owner and end up turning it in to the police. You feel good for doing the right thing.', happinessChange: 5, karmaChange: 5, moralChange: 5 } }] },
            { text: 'Take the money and leave the wallet.', outcomes: [{ probability: 0.8, outcome: { narrative: 'You pocket the cash and walk away, your heart pounding. You got away with it.', wealthChange: 50, happinessChange: -5, karmaChange: -10, moralChange: -10 } }, { probability: 0.2, outcome: { narrative: 'A bystander saw you and scolds you, making you return the wallet. You feel ashamed.', happinessChange: -15, karmaChange: -5 } }] },
        ]
    },
    {
        eventId: 'child_bully',
        description: 'A bully at school starts teasing you in front of your friends.',
        condition: (c) => c.age >= 7 * 12 && c.age < 13 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Stand up to the bully.', outcomes: [{ probability: 0.4, outcome: { narrative: 'You confront the bully, who backs down in surprise. Your friends are impressed.', happinessChange: 10, charismaChange: 5 } }, { probability: 0.6, outcome: { narrative: 'The bully shoves you, and you get into a scuffle. You get a few bruises but feel proud for standing up for yourself.', happinessChange: 5, healthChange: -5 } }] },
            { text: 'Ignore them.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You ignore them and walk away. It stings a little, but you avoid a confrontation.', happinessChange: -5 } }] },
            { text: 'Tell a teacher.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You tell a teacher, who handles the situation. You feel relieved, but also a bit like a tattletale.', happinessChange: 2, smartsChange: 2 } }] },
        ]
    },
    {
        eventId: 'child_school_test',
        description: 'You get the results back from your big math test.',
        condition: (c) => c.age >= 8 * 12 && c.age < 13 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Check your grade.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You got an A! All your hard work paid off. Your parents will be so pleased.', happinessChange: 20, smartsChange: 5, relationshipChange: { npcId: 'mother', change: 5 } } }, { probability: 0.5, outcome: { narrative: 'You got a D. You feel disappointed in yourself and worry about what your parents will say.', happinessChange: -20, smartsChange: -2, relationshipChange: { npcId: 'mother', change: -5 } } }] },
        ]
    },
     {
        eventId: 'child_get_pet',
        description: 'You\'ve been begging your parents for a pet for months. Today, they finally have an answer for you.',
        condition: (c) => c.age >= 8 * 12 && c.age < 14 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Hope for the best!', outcomes: [{ probability: 0.4, outcome: { narrative: 'They said yes! They take you to adopt a little puppy. You are overjoyed!', happinessChange: 40, moralChange: 5 } }, { probability: 0.6, outcome: { narrative: 'They said no. They think you\'re not responsible enough yet. You are heartbroken.', happinessChange: -30 } }] },
        ]
    },
    {
        eventId: 'child_school_play',
        description: 'Your school is putting on a play. Auditions are today.',
        condition: (c) => c.age >= 9 * 12 && c.age < 13 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Audition for the lead role.', outcomes: [{ probability: 0.2, outcome: { narrative: 'You nailed the audition and got the lead role! You feel like a star.', happinessChange: 25, charismaChange: 10, fameChange: 5 } }, { probability: 0.8, outcome: { narrative: 'You didn\'t get the lead, but you were cast as a tree. It\'s something.', happinessChange: -5, charismaChange: 1 } }] },
            { text: 'Help out with the set design.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You volunteer to paint the sets. It\'s fun, and everyone appreciates your artistic talent.', happinessChange: 10, smartsChange: 3 } }] },
            { text: 'Avoid it completely.', outcomes: [{ probability: 1.0, outcome: { narrative: 'Stage fright is real. You decide to sit this one out.', happinessChange: -1 } }] },
        ]
    },
    {
        eventId: 'child_sleepover',
        description: 'You were invited to a sleepover at your best friend\'s house.',
        condition: (c) => c.age >= 8 * 12 && c.age < 12 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Go and have fun.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You stay up late telling scary stories and playing video games. It was an awesome night!', happinessChange: 20 } }] },
            { text: 'Pretend you are sick.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You tell your friend you are sick. You spend the night at home, feeling a little lonely.', happinessChange: -10 } }] },
            { text: 'Go, but get homesick.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You have fun for a while but get homesick in the middle of the night and have to call your parents to pick you up. It\'s a little embarrassing.', happinessChange: -15 } }] },
        ]
    },
    {
        eventId: 'child_report_card',
        description: 'You bring home your report card from school.',
        condition: (c) => c.age >= 6 * 12 && c.age < 18 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Show it to your parents.', outcomes: [
                { probability: 0.5, outcome: { narrative: 'It\'s full of good grades! Your parents are proud and give you a reward.', happinessChange: 20, smartsChange: 2, relationshipChange: { npcId: 'father', change: 5 } } },
                { probability: 0.5, outcome: { narrative: 'Your grades are terrible. Your parents are disappointed and ground you.', happinessChange: -25, relationshipChange: { npcId: 'father', change: -10 } } },
            ]},
            { text: 'Hide it from them.', outcomes: [
                 { probability: 0.3, outcome: { narrative: 'You manage to hide the bad report card. You got away with it, for now.', moralChange: -5 } },
                 { probability: 0.7, outcome: { narrative: 'Your parents find the report card you hid. They are furious that you lied to them.', happinessChange: -35, moralChange: -10, relationshipChange: { npcId: 'father', change: -15 } } },
            ]},
        ]
    },
    {
        eventId: 'child_learn_bike',
        description: 'Your parent is helping you learn to ride a bike without training wheels.',
        condition: (c) => c.age >= 5 * 12 && c.age < 9 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Keep trying.', outcomes: [
                { probability: 0.6, outcome: { narrative: 'You wobble, you fall, but you get back up. Suddenly, you\'re balancing and pedaling on your own! It\'s an amazing feeling of freedom.', happinessChange: 30, healthChange: -2 } },
                { probability: 0.4, outcome: { narrative: 'You fall and scrape your knee one too many times. You give up for the day, frustrated.', happinessChange: -15, healthChange: -5 } },
            ]},
            { text: 'Refuse to try.', outcomes: [{ probability: 1.0, outcome: { narrative: 'It looks too scary. You tell your parent you don\'t want to do it.', happinessChange: -5 } }]},
        ]
    },
    {
        eventId: 'child_allowance',
        description: 'Your parents have decided to start giving you a small monthly allowance.',
        condition: (c) => c.age >= 7 * 12 && c.age < 14 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Thank them.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You receive your first allowance. It feels great to have your own money!', happinessChange: 15, wealthChange: 10 } }] },
            { text: 'Ask for more.', outcomes: [{ probability: 0.2, outcome: { narrative: 'Surprisingly, they agree to a slightly higher amount for doing extra chores.', happinessChange: 20, wealthChange: 15 } }, { probability: 0.8, outcome: { narrative: 'They tell you not to be greedy. You get the original amount.', happinessChange: -5, wealthChange: 10 } }] },
        ]
    },

    // --- TEENAGER (13-17 Years) ---
    {
        eventId: 'teen_first_crush',
        description: 'You develop a huge crush on someone in your class.',
        condition: (c) => c.age >= 13 * 12 && c.age < 18 * 12 && c.currentPartnerId === null,
        eventType: 'monthly',
        choices: [
            { text: 'Ask them out.', outcomes: [{ probability: 0.4, outcome: { narrative: 'They say yes! You feel like you\'re on top of the world. You are now dating.', happinessChange: 25, charismaChange: 5, startsNewRelationship: true } }, { probability: 0.6, outcome: { narrative: 'They politely turn you down. It\'s embarrassing, but you\'ll get over it.', happinessChange: -15 } }] },
            { text: 'Write them an anonymous love note.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You see them reading the note and smiling. They never find out it was you, but it makes you happy.', happinessChange: 10 } }, { probability: 0.5, outcome: { narrative: 'The note gets passed around the class, and everyone makes fun of it. You are mortified.', happinessChange: -20 } }] },
            { text: 'Do nothing and admire from afar.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide not to risk rejection and keep your feelings to yourself.', happinessChange: -2 } }] },
        ]
    },
    {
        eventId: 'teen_exam_cheat',
        description: 'You have a major exam coming up that you feel unprepared for. A friend offers you the answer key.',
        condition: (c) => c.age >= 14 * 12 && c.age < 18 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Use the answer key.', outcomes: [{ probability: 0.6, outcome: { narrative: 'You use the key and ace the exam, though you feel a bit guilty.', smartsChange: -5, happinessChange: 5, karmaChange: -10, moralChange: -15 } }, { probability: 0.4, outcome: { narrative: 'You get caught cheating! The school suspends you, and your parents are furious.', happinessChange: -40, smartsChange: -10, karmaChange: -15, moralChange: -10 } }] },
            { text: 'Refuse and study hard.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You pull an all-nighter and manage to pass the exam honestly. You\'re exhausted but proud.', smartsChange: 10, healthChange: -5, happinessChange: 10, karmaChange: 5, moralChange: 10 } }, { probability: 0.5, outcome: { narrative: 'Despite your best efforts, you don\'t do well on the exam. It\'s disappointing, but at least you have your integrity.', smartsChange: 5, happinessChange: -10, moralChange: 5 } }] },
        ]
    },
    {
        eventId: 'teen_house_party',
        description: 'You get invited to a huge house party this weekend. Your parents will never say yes.',
        condition: (c) => c.age >= 15 * 12 && c.age < 19 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Sneak out to go to the party.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You sneak out and have an amazing time at the party! You get home without being caught.', happinessChange: 20, moralChange: -5, karmaChange: -5 } }, { probability: 0.5, outcome: { narrative: 'You get caught trying to sneak back in! You are grounded for a month.', happinessChange: -30, moralChange: -5, relationshipChange: { npcId: 'father', change: -10 } } }] },
            { text: 'Obey your parents and stay home.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide not to risk it and stay home. It\'s a boring weekend, but you stay out of trouble.', happinessChange: -10, moralChange: 5, karmaChange: 5 } }] },
        ]
    },
     {
        eventId: 'teen_drivers_license',
        description: 'You\'re old enough to get your driver\'s license.',
        condition: (c) => c.age >= 16 * 12 && c.age < 18 * 12 && !c.licenses.includes('Driving'),
        eventType: 'monthly',
        choices: [
            { text: 'Take the driving test.', outcomes: [{ probability: 0.7, outcome: { narrative: 'You passed! The open road is yours. This is a huge step toward independence.', happinessChange: 25 } }, { probability: 0.3, outcome: { narrative: 'You failed the test. The instructor said you need more practice with parallel parking.', happinessChange: -15 } }] },
            { text: 'Wait a while longer.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide you\'re not ready for the responsibility yet.', happinessChange: -2 } }] },
        ]
    },
    {
        eventId: 'teen_pimple',
        description: 'You wake up on the day of school pictures with a giant pimple on your nose.',
        condition: (c) => c.age >= 13 * 12 && c.age < 18 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Try to pop it.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You squeeze it, but it only makes it redder and more noticeable. Your picture looks terrible.', looksChange: -10, happinessChange: -15 } }, { probability: 0.5, outcome: { narrative: 'Success! You managed to pop it without making it worse. It\'s still visible, but not as bad.', looksChange: -5, happinessChange: -5 } }] },
            { text: 'Cover it with makeup.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You use some concealer to cover it up. It\'s not perfect, but it helps.', looksChange: -2, happinessChange: 2 } }] },
            { text: 'Own it.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide not to worry about it. It\'s just a pimple. Your confidence is impressive.', happinessChange: 5, charismaChange: 3 } }] },
        ]
    },
    {
        eventId: 'teen_peer_pressure_alcohol',
        description: 'At a party, someone hands you a beer.',
        condition: (c) => c.age >= 15 * 12 && c.age < 21 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Drink it.', outcomes: [{ probability: 0.8, outcome: { narrative: 'You drink the beer. You feel buzzed and have a good time.', happinessChange: 10, healthChange: -3, moralChange: -5 } }, { probability: 0.2, outcome: { narrative: 'You drink way too much and get sick. The hangover the next day is brutal.', happinessChange: -20, healthChange: -10 } }] },
            { text: 'Politely refuse.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You say "no thanks." Some people tease you, but you stick to your guns.', happinessChange: 5, moralChange: 10 } }] },
        ]
    },
    {
        eventId: 'teen_college_application',
        description: 'It\'s time to start thinking about life after high school.',
        condition: (c) => c.age >= 17 * 12 && c.age < 18 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Apply to university.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You spend weeks working on applications and essays. It\'s stressful, but you\'re hopeful for the future.', smartsChange: 5, happinessChange: -5 } }] },
            { text: 'Plan to get a job.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide college isn\'t for you and start looking for full-time job opportunities.', happinessChange: 2 } }] },
            { text: 'Don\'t think about it.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide to ignore the future for now and just enjoy your last year of high school.', smartsChange: -5, happinessChange: 10 } }] },
        ]
    },

    // --- ADULT (18+) ---
    {
        eventId: 'adult_have_child',
        description: 'You and your partner are trying for a baby.',
        condition: (c) => c.age >= 20 * 12 && c.age < 45 * 12 && c.currentPartnerId !== null && Math.random() < 0.1, // make it less frequent
        eventType: 'monthly',
        choices: [
            { text: 'Let nature take its course.', outcomes: [{ 
                probability: 1.0, 
                outcome: { 
                    narrative: 'Congratulations! After a short while, you welcome a new baby into your family!', 
                    happinessChange: 40,
                    newChild: true,
                } 
            }] },
        ]
    },
    {
        eventId: 'adult_job_offer',
        description: 'You receive a surprise job offer from a rival company. It pays more, but you like your current job.',
        condition: (c) => c.age >= 18 * 12 && c.currentJob !== null,
        eventType: 'monthly',
        choices: [
            { text: 'Accept the new job.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You take the new job. It comes with a nice pay bump and new challenges. Your career is advancing!', happinessChange: 10, wealthChange: 500 } }] },
            { text: 'Use it to get a raise.', outcomes: [{ probability: 0.6, outcome: { narrative: 'You leverage the offer, and your current employer gives you a raise to keep you!', happinessChange: 15, wealthChange: 300 } }, { probability: 0.4, outcome: { narrative: 'Your boss calls your bluff and wishes you well in your new role. You are forced to take the new job.', happinessChange: -5, wealthChange: 500 } }] },
            { text: 'Decline the offer.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide to stay loyal to your current company. It\'s a safe choice.', happinessChange: 2 } }] },
        ]
    },
    {
        eventId: 'adult_unwell',
        description: 'You\'ve been feeling unwell lately, with a persistent cough and fatigue.',
        condition: (c) => c.age >= 20 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Go to the doctor.', outcomes: [{ probability: 0.6, outcome: { narrative: 'You visit the doctor. It turns out to be a nasty flu. They prescribe some medication.', healthChange: -5, newAilmentId: 'influenza' } }, { probability: 0.4, outcome: { narrative: 'You visit the doctor. It is just a common cold, but it is better to be safe.', newAilmentId: 'common_cold' } }] },
            { text: 'Ignore it and hope it goes away.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You try to tough it out, but your condition worsens. You should have gone to the doctor.', healthChange: -10, newAilmentId: 'influenza' } }, { probability: 0.5, outcome: { narrative: 'After a few days of rest, you start to feel better. It was probably just a minor bug.', healthChange: -2 } }] },
            { text: 'Try an old family remedy.', outcomes: [{ probability: 0.2, outcome: { narrative: 'The strange concoction does wonders! You feel much better.', healthChange: 5, happinessChange: 5 } }, { probability: 0.8, outcome: { narrative: 'The remedy doesn\'t seem to do anything. Your cough persists.', healthChange: -5, newAilmentId: 'common_cold' } }] },
        ]
    },
    {
        eventId: 'temptation_work',
        description: 'A very attractive coworker asks you to stay late to "work on a project", making it clear they\'re interested in more. You are currently in a relationship.',
        condition: (c) => c.age >= 20 * 12 && c.currentJob !== null && c.currentPartnerId !== null,
        eventType: 'monthly',
        choices: [
            { text: 'Stay late and hook up.', outcomes: [{ probability: 0.8, outcome: { narrative: 'You hook up with your coworker. It was thrilling, but the guilt is eating at you. You got away with it... for now.', happinessChange: 15, moralChange: -20, karmaChange: -15 } }, { probability: 0.2, outcome: { narrative: 'You hook up, but your partner finds out through the grapevine! They are furious and break up with you.', happinessChange: -50, moralChange: -30, karmaChange: -20, breakup: true } }] },
            { text: 'Politely decline and go home.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You tell them you\'re flattered but committed to your partner. You go home with a clear conscience.', happinessChange: 5, moralChange: 10, karmaChange: 5 } }] },
        ]
    },
    {
        eventId: 'adult_lottery',
        description: 'You walk past a convenience store and decide to buy a lottery ticket on a whim.',
        condition: (c) => c.age >= 18 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Buy a ticket.', outcomes: [{ probability: 0.95, outcome: { narrative: 'You buy the ticket but don\'t win anything. Oh well, it was worth a shot.', wealthChange: -5 } }, { probability: 0.04, outcome: { narrative: 'You won a small prize! It\'s enough to treat yourself to a nice dinner.', wealthChange: 100, happinessChange: 15 } }, { probability: 0.01, outcome: { narrative: 'You hit the jackpot! Your life is about to change forever!', wealthChange: 1000000, happinessChange: 100 } }] },
            { text: 'Save your money.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide not to buy a ticket. It\'s probably a waste of money anyway.', moralChange: 1 } }] },
        ]
    },
    {
        eventId: 'adult_jury_duty',
        description: 'You receive a summons for jury duty.',
        condition: (c) => c.age >= 21 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Perform your civic duty.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You spend a week at the courthouse. It\'s a bit boring, but you feel good about participating in the justice system.', happinessChange: -5, moralChange: 10, karmaChange: 5 } }] },
            { text: 'Try to get out of it.', outcomes: [{ probability: 0.5, outcome: { narrative: 'You manage to come up with a convincing excuse. You\'re free!', happinessChange: 5, moralChange: -5, karmaChange: -5 } }, { probability: 0.5, outcome: { narrative: 'Your excuse isn\'t accepted, and the judge gives you a stern warning. You have to serve anyway.', happinessChange: -10, moralChange: -10 } }] },
        ]
    },
    {
        eventId: 'adult_marriage_proposal',
        description: 'Your long-term partner gets down on one knee and proposes to you!',
        condition: (c) => c.age >= 22 * 12 && c.currentPartnerId !== null,
        eventType: 'monthly',
        choices: [
            { text: 'Say yes!', outcomes: [{ probability: 1.0, outcome: { narrative: 'You joyfully accept! You are now engaged to the love of your life.', happinessChange: 50 } }] },
            { text: 'Say no.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You tell them you\'re not ready for that kind of commitment. They are devastated, and you break up.', happinessChange: -40, breakup: true } }] },
        ]
    },
    {
        eventId: 'adult_car_accident',
        description: 'While driving, another car runs a red light and crashes into you.',
        condition: (c) => c.age >= 18 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Oh no!', outcomes: [
                { probability: 0.6, outcome: { narrative: 'It was a minor fender-bender. No one was hurt, but dealing with insurance will be a headache.', happinessChange: -15, healthChange: -2 } },
                { probability: 0.3, outcome: { narrative: 'The crash was serious. You suffer a concussion and have to spend a night in the hospital.', happinessChange: -30, healthChange: -20, newAilmentId: 'concussion' } },
                { probability: 0.1, outcome: { narrative: 'The accident was fatal.', obituary: 'Died tragically in a car accident.' } },
            ]}
        ]
    },
    {
        eventId: 'adult_move_out',
        description: 'You decide it\'s finally time to move out of your parents\' house.',
        condition: (c) => c.age >= 18 * 12 && c.age < 30 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Rent an apartment.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You find a small apartment and move in. It\'s not much, but it\'s yours. The freedom is exhilarating!', happinessChange: 30 } }] },
            { text: 'Stay with your parents.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide against it. It\'s cheaper to live at home, but you feel a little childish.', happinessChange: -10, relationshipChange: { npcId: 'mother', change: 5 } } }] },
        ]
    },
    {
        eventId: 'adult_reunion',
        description: 'You receive an invitation to your 10-year high school reunion.',
        condition: (c) => c.age >= 27 * 12 && c.age < 29 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Go and show off.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You go to the reunion and have a great time reconnecting with old friends and showing how well you\'ve done.', happinessChange: 20, charismaChange: 5 } }] },
            { text: 'Go reluctantly.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You go, but it\'s awkward. Everyone seems to be comparing their lives. You leave early.', happinessChange: -15 } }] },
            { text: 'Decline the invitation.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide to leave the past in the past and throw the invitation in the trash.', happinessChange: -2 } }] },
        ]
    },
    {
        eventId: 'adult_unexpected_bill',
        description: 'You receive a large, unexpected medical bill in the mail.',
        condition: (c) => c.age >= 25 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Pay it off.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You sigh and pay the bill from your savings. It\'s a major setback.', happinessChange: -20, wealthChange: -800 } }] },
            { text: 'Ignore it.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You ignore the bill. It will probably go to collections and hurt your credit score.', happinessChange: -5, karmaChange: -5, moralChange: -5 } }] },
        ]
    },
    {
        eventId: 'adult_midlife_crisis',
        description: 'You look in the mirror and feel like you\'re in a rut. You have a sudden urge to make a drastic life change.',
        condition: (c) => c.age >= 40 * 12 && c.age < 50 * 12,
        eventType: 'monthly',
        choices: [
            { text: 'Buy a sports car.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You drain your savings to buy a flashy sports car. It\'s impractical but makes you feel young again.', happinessChange: 30, wealthChange: -50000 } }] },
            { text: 'Quit your job to travel.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You quit your job and buy a one-way ticket to another country. It\'s reckless, but you feel alive!', happinessChange: 40, moralChange: -10 } }] },
            { text: 'Talk to a therapist.', outcomes: [{ probability: 1.0, outcome: { narrative: 'You decide to talk to a professional about your feelings. It\'s a healthy way to cope.', happinessChange: 15, smartsChange: 5, moralChange: 5 } }] },
        ]
    },
];