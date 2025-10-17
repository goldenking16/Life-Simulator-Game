import type { Character, GameEvent, EventOutcome, CustomLifeData, Job, Investment, NPC, Choice, Ailment } from '../../types';
import { ALL_EVENTS } from '../events';
import { AILMENTS } from '../ailments';
import { ALL_JOBS } from '../jobs';
import { REAL_ESTATE_LISTINGS } from '../realEstate';
import { STOCKS, CRYPTO } from '../investments';
import { MALE_FIRST_NAMES, FEMALE_FIRST_NAMES, LAST_NAMES } from '../names';
import { namesByCountry } from '../namesByCountry';
import { countries } from '../countries';
import { allCities } from '../cities';


// --- UTILITY FUNCTIONS ---
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

function getRandomElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    // This should not happen with current data, but it's a good safeguard.
    throw new Error("Cannot get a random element from an empty array.");
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- CHARACTER CREATION ---
const generateParents = (lastName: string, country: string, city: string) => {
    const countryData = countries.find(c => c.name === country);
    const countryNames = countryData ? namesByCountry[countryData.name as keyof typeof namesByCountry] : null;

    const motherFirstName = getRandomElement(countryNames ? countryNames.female : FEMALE_FIRST_NAMES);
    const fatherFirstName = getRandomElement(countryNames ? countryNames.male : MALE_FIRST_NAMES);
    
    const mother: NPC = {
        id: 'mother',
        name: `${motherFirstName} ${lastName}`,
        relationshipType: 'Mother',
        age: getRandomInt(20, 40),
        relationshipStatus: 85,
        avatar: '👩',
        gender: 'Female',
        isAlive: true,
    };
    
    const father: NPC = {
        id: 'father',
        name: `${fatherFirstName} ${lastName}`,
        relationshipType: 'Father',
        age: mother.age + getRandomInt(-2, 5),
        relationshipStatus: 85,
        avatar: '👨',
        gender: 'Male',
        isAlive: true,
    };
    
    const wealthLevels = ['poor', 'middle-class', 'wealthy'];
    const wealth = getRandomElement(wealthLevels);
    let backstory = `You were born to ${mother.name} and ${father.name} in ${city}, ${country}. `;
    let startingWealth = 0;
    
    switch (wealth) {
        case 'poor':
            backstory += 'Your family struggled to make ends meet, but they were full of love.';
            startingWealth = getRandomInt(0, 100);
            break;
        case 'middle-class':
            backstory += 'Your family lived a comfortable middle-class life.';
            startingWealth = getRandomInt(1000, 5000);
            break;
        case 'wealthy':
            backstory += 'You were born into a wealthy family with many opportunities.';
            startingWealth = getRandomInt(20000, 100000);
            break;
    }
    
    return { mother, father, backstory, startingWealth };
};

export const getNewRandomLife = () => {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const country = getRandomElement(countries).name;
    const countryData = countries.find(c => c.name === country);
    const countryNames = countryData ? namesByCountry[countryData.name as keyof typeof namesByCountry] : null;
    const cities = allCities[country] || ['Capital City'];
    const city = getRandomElement(cities);

    const firstName = getRandomElement(
        countryNames 
        ? (gender === 'Male' ? countryNames.male : countryNames.female)
        : (gender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES)
    );
    const lastName = getRandomElement(LAST_NAMES);

    const { mother, father, backstory, startingWealth } = generateParents(lastName, country, city);
    
    return {
        name: `${firstName} ${lastName}`,
        gender: gender,
        country: country,
        city: city,
        // FIX: Added missing 'age' property to satisfy the Character type.
        age: 0,
        dob: `${new Date().getFullYear() - 0}-${String(getRandomInt(1, 12)).padStart(2, '0')}-${String(getRandomInt(1, 28)).padStart(2, '0')}`,
        health: 100,
        happiness: 100,
        smarts: getRandomInt(20, 100),
        looks: getRandomInt(20, 100),
        charisma: getRandomInt(20, 100),
        karma: 50,
        moral: 50,
        fame: 0,
        personality: getRandomElement(['Ambitious', 'Cheerful', 'Grumpy', 'Generous', 'Lazy', 'Creative']),
        cash: 0,
        bankBalance: startingWealth,
        isAlive: true,
        occupation: 'Infant',
        educationLevel: 'None',
        educationHistory: [],
        licenses: [],
        assets: [],
        investments: [],
        investmentStats: { totalInvested: 0, totalReturns: 0, ageStartedInvesting: null },
        currentJob: null,
        jobHistory: [],
        jailHistory: [],
        npcs: [mother, father],
        ailments: [],
        isOnDiet: false,
        hasCult: false,
        socialMedia: {},
        eventHistory: [],
        startingWealth,
        parentsBackstory: backstory,
        birthNarrative: `You were born a healthy baby ${gender === 'Male' ? 'boy' : 'girl'}. Your parents named you ${firstName}.`
    };
};

export const getNewCustomLife = (data: CustomLifeData) => {
    const { mother, father, backstory, startingWealth } = generateParents(data.lastName, data.country, data.city);
    mother.name = data.motherName + ' ' + data.lastName;
    father.name = data.fatherName + ' ' + data.lastName;

    return {
        name: `${data.firstName} ${data.lastName}`,
        gender: data.gender,
        country: data.country,
        city: data.city,
        // FIX: Added missing 'age' property to satisfy the Character type.
        age: 0,
        dob: `${data.dob_year}-${String(data.dob_month).padStart(2, '0')}-${String(data.dob_day).padStart(2, '0')}`,
        health: 100,
        happiness: 100,
        smarts: getRandomInt(20, 100),
        looks: getRandomInt(20, 100),
        charisma: getRandomInt(20, 100),
        karma: 50,
        moral: 50,
        fame: 0,
        personality: getRandomElement(['Ambitious', 'Cheerful', 'Grumpy', 'Generous', 'Lazy', 'Creative']),
        cash: 0,
        bankBalance: startingWealth,
        isAlive: true,
        occupation: 'Infant',
        educationLevel: 'None',
        educationHistory: [],
        licenses: [],
        assets: [],
        investments: [],
        investmentStats: { totalInvested: 0, totalReturns: 0, ageStartedInvesting: null },
        currentJob: null,
        jobHistory: [],
        jailHistory: [],
        npcs: [mother, father],
        ailments: [],
        isOnDiet: false,
        hasCult: false,
        socialMedia: {},
        eventHistory: [],
        startingWealth,
        parentsBackstory: backstory,
        birthNarrative: `You were born a healthy baby ${data.gender === 'Male' ? 'boy' : 'girl'}. Your parents named you ${data.firstName}.`
    };
};


// --- EVENTS AND CHOICES ---
export const getMonthlyEvent = (character: Character): GameEvent | null => {
    const possibleEvents = ALL_EVENTS.filter(event => 
        event.condition(character) && !character.eventHistory.includes(event.eventId)
    );
    if (possibleEvents.length === 0) return null;
    return getRandomElement(possibleEvents);
};

export const processChoice = (choice: Choice): EventOutcome => {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (const outcome of choice.outcomes) {
        cumulativeProbability += outcome.probability;
        if (rand <= cumulativeProbability) {
            return outcome.outcome;
        }
    }
    // Fallback to the last outcome if something goes wrong with probabilities
    return choice.outcomes[choice.outcomes.length - 1].outcome;
};

// --- AILMENTS ---
export const getAilmentById = (id: string): Ailment | undefined => {
    return AILMENTS.find(a => a.id === id);
};


// --- JOBS ---
export const getAvailableJobs = (character: Character) => {
    const availableJobs = ALL_JOBS.filter(job => {
        const ageYears = Math.floor(character.age / 12);
        const { ageMin, ageMax, smartsMin, education } = job.requirements;

        if (ageMin && ageYears < ageMin) return false;
        if (ageMax && ageYears > ageMax) return false;
        if (smartsMin && character.smarts < smartsMin) return false;
        if (education && character.educationLevel !== education && !character.educationHistory.includes(education)) return false;
        
        return true;
    });
    return { jobs: availableJobs };
};

// --- REAL ESTATE ---
export const getAvailableRealEstate = (character: Character) => {
    return { listings: REAL_ESTATE_LISTINGS };
};


// --- INVESTMENTS ---
export const getMarketHealth = (): number => getRandomInt(20, 95);

export const getFinancialOpinion = (): string => {
    const opinions = [
        "The market is looking bullish! It's a great time to buy.",
        "I'm feeling bearish right now. Maybe hold onto your cash.",
        "Crypto is the future! You should invest everything.",
        "Stocks are a safe bet for long-term growth.",
        "Diversify your portfolio to minimize risk.",
        "I have a bad feeling about the tech sector this year.",
    ];
    return getRandomElement(opinions);
};

export const getFinancialNews = () => {
    const headlines = [
        'Quantum Leap Inc. Announces Breakthrough in AI',
        'EcoSolutions Corp. Faces Scrutiny Over Environmental Impact',
        'CyberSafe Systems Hit by Major Data Breach',
        'BitCoin Surges to New All-Time High',
        'Starlight Hotels Reports Record Profits',
        'Global Markets Tumble Amid Political Uncertainty'
    ];
    const bodies = [
        'Investors are flocking to QLI after their recent announcement, causing stock prices to soar.',
        'Activists are calling for a boycott of ESC products, leading to a sharp decline in their stock value.',
        'CSS stock has plummeted after the company revealed a significant security incident. Experts are unsure if they can recover.',
        'The cryptocurrency market is on fire as BitCoin continues its meteoric rise, pulling other digital assets up with it.',
        'With travel back in full swing, SHH has exceeded all financial expectations for this quarter.',
        'A wave of fear is sweeping through the financial world, with major indices showing significant losses across the board.'
    ];

    return [
        { headline: getRandomElement(headlines), body: getRandomElement(bodies) },
        { headline: getRandomElement(headlines), body: getRandomElement(bodies) },
        { headline: getRandomElement(headlines), body: getRandomElement(bodies) },
    ];
};

export const getMarketData = (character: Character) => {
    const fluctuate = (price: number) => price * (1 + (Math.random() - 0.5) * 0.2); // +/- 10% fluctuation

    return {
        stocks: STOCKS.map(s => ({ ...s, price: fluctuate(s.price) })),
        crypto: CRYPTO.map(c => ({ ...c, price: fluctuate(c.price) })),
    };
};

export const getMarketUpdate = (investments: Investment[]) => {
    const updates = investments.map(inv => {
        const fluctuation = (Math.random() - 0.45) * 0.15; // Skewed slightly positive
        const newPrice = inv.currentValuePerShare * (1 + fluctuation);
        return { symbol: inv.symbol, newPrice };
    });
    return { updates };
};

// --- RELATIONSHIPS / NPCs ---
export const handleNpcInteraction = (character: Character, npc: NPC, action: string): { updates: Partial<Character>; narrative: string; isPositive: boolean; askOutSuccess?: boolean; } => {
    let updates: Partial<Character> = {};
    let narrative = "";
    let isPositive = false;
    let askOutSuccess = false;
    
    const relationshipChange = (change: number) => {
        updates.npcs = character.npcs.map(n => n.id === npc.id ? { ...n, relationshipStatus: Math.max(0, Math.min(100, n.relationshipStatus + change)) } : n);
    };

    switch (action) {
        case 'Ask Out':
            if (character.charisma > 40 && npc.relationshipStatus > 50 && Math.random() > 0.4) {
                narrative = `${npc.name} accepted! You are now dating.`;
                isPositive = true;
                askOutSuccess = true;
                relationshipChange(20);
                updates.happiness = (character.happiness ?? 0) + 20;
            } else {
                narrative = `${npc.name} rejected you. It was awkward.`;
                isPositive = false;
                relationshipChange(-10);
                updates.happiness = (character.happiness ?? 0) - 15;
            }
            break;
        case 'Compliment':
            relationshipChange(getRandomInt(5, 15));
            narrative = `You complimented ${npc.name}. They seemed pleased.`;
            isPositive = true;
            break;
        case 'Conversation':
            relationshipChange(getRandomInt(3, 10));
            narrative = `You had a nice conversation with ${npc.name}.`;
            isPositive = true;
            break;
        case 'Insult':
            relationshipChange(getRandomInt(-20, -10));
            narrative = `You insulted ${npc.name}. They are angry with you.`;
            isPositive = false;
            break;
        case 'Spend time':
            relationshipChange(getRandomInt(10, 20));
            narrative = `You spent some quality time with ${npc.name}.`;
            isPositive = true;
            updates.happiness = (character.happiness ?? 0) + 5;
            break;
        default:
            narrative = `The '${action}' interaction is not fully implemented yet.`;
            break;
    }
    return { updates, narrative, isPositive, askOutSuccess };
};


// --- ACTIVITIES ---
type AdoptableChild = { name: string; age: number; gender: 'Male' | 'Female', health: number, happiness: number, smarts: number, looks: number, personality: string };
export const getAdoptableChildren = (character: Character): AdoptableChild[] => {
    const children: AdoptableChild[] = [];
    for (let i = 0; i < 5; i++) {
        const gender = Math.random() > 0.5 ? 'Male' : 'Female';
        const countryData = countries.find(c => c.name === character.countryOfBirth);
        const countryNames = countryData ? namesByCountry[countryData.name as keyof typeof namesByCountry] : null;

        const firstName = getRandomElement(
            countryNames 
            ? (gender === 'Male' ? countryNames.male : countryNames.female)
            : (gender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES)
        );
        
        children.push({
            name: `${firstName} ${getRandomElement(LAST_NAMES)}`,
            age: getRandomInt(1, 10),
            gender: gender,
            health: getRandomInt(70, 100),
            happiness: getRandomInt(30, 80),
            smarts: getRandomInt(30, 90),
            looks: getRandomInt(30, 90),
            personality: getRandomElement(['Shy', 'Outgoing', 'Creative', 'Quiet', 'Energetic']),
        });
    }
    return children;
};
