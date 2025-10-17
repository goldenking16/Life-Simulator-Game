import React, { useState, useEffect } from 'react';
import type { Character, GameStatus, GameLogEntry, GameEvent, EventOutcome, CustomLifeData, Job, Asset, Investment, SocialMediaPlatform, NPC } from './types';
import { getNewRandomLife, getNewCustomLife, getMonthlyEvent, processChoice, getAilmentById, handleNpcInteraction, getMarketUpdate } from './data/services/gameService';
import { countries } from './data/countries';
import { MALE_FIRST_NAMES, FEMALE_FIRST_NAMES, LAST_NAMES } from './data/names';
import { namesByCountry } from './data/namesByCountry';
import StartScreen from './components/StartScreen';
import CreateLifeScreen from './components/CreateLifeScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import BankAccountScreen from './components/BankAccountScreen';
import JobScreen from './components/JobScreen';
import AssetsScreen from './components/AssetsScreen';
import RealEstateScreen from './components/RealEstateScreen';
import InvestmentsScreen from './components/InvestmentsScreen';
import InvestmentPortfolioScreen from './components/InvestmentPortfolioScreen';
import InvestmentMarketScreen from './components/InvestmentMarketScreen';
import InvestmentStatsScreen from './components/InvestmentStatsScreen';
import FinancialNewsScreen from './components/FinancialNewsScreen';
import RelationshipsScreen from './components/RelationshipsScreen';
import ActivitiesScreen from './components/ActivitiesScreen';
import SocialMediaScreen from './components/SocialMediaScreen';
import PlatformScreen from './components/PlatformScreen';
import DoctorScreen from './components/DoctorScreen';
import MindAndBodyScreen from './components/MindAndBodyScreen';
import LoveScreen from './components/LoveScreen';
import LicensesScreen from './components/LicensesScreen';
import PremiumActivitiesScreen from './components/PremiumActivitiesScreen';
import AdoptionCenterScreen from './components/AdoptionCenterScreen';
import PetsScreen from './components/PetsScreen';
import EmigrateScreen from './components/EmigrateScreen';

const SAVE_KEY = 'life-simulator-save';
const PERSONALITIES = ['Ambitious', 'Cheerful', 'Grumpy', 'Generous', 'Lazy', 'Creative'];

// FIX: Changed generic arrow function to a standard function declaration.
// This can prevent TSX parsing issues where the '<' in the generic is misinterpreted as a JSX tag.
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

// FIX: Switched to a named export to resolve module loading issues.
export function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('start');
  const [character, setCharacter] = useState<Character | null>(null);
  const [log, setLog] = useState<GameLogEntry[]>([]);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [currentOutcome, setCurrentOutcome] = useState<EventOutcome | null>(null);
  const [finalCharacter, setFinalCharacter] = useState<Character | null>(null);
  const [heirs, setHeirs] = useState<NPC[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canLoad, setCanLoad] = useState<boolean>(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform | null>(null);
  const [marketType, setMarketType] = useState<'stocks' | 'crypto' | null>(null);


  useEffect(() => {
    const savedGame = localStorage.getItem(SAVE_KEY);
    setCanLoad(!!savedGame);
    setIsLoading(false);
  }, []);

  const saveGame = (char: Character, gameLog: GameLogEntry[]) => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ character: char, log: gameLog }));
    setCanLoad(true);
  };

  const loadGame = () => {
    setIsLoading(true);
    const savedGame = localStorage.getItem(SAVE_KEY);
    if (savedGame) {
      const { character: savedChar, log: savedLog } = JSON.parse(savedGame);
      setCharacter(savedChar);
      setLog(savedLog);
      setGameStatus('playing');
    }
    setIsLoading(false);
  };
  
  const resetGame = () => {
      setCharacter(null);
      setFinalCharacter(null);
      setHeirs([]);
      setLog([]);
      setCurrentEvent(null);
      setCurrentOutcome(null);
      setGameStatus('start');
      localStorage.removeItem(SAVE_KEY);
      setCanLoad(false);
  };

  const initializeCharacter = (lifeData: ReturnType<typeof getNewRandomLife> | ReturnType<typeof getNewCustomLife>) => {
    const countryData = countries.find(c => c.name === lifeData.country);
    if (!countryData) {
      console.error("Country not found!");
      return;
    }

    const newChar: Character = {
        ...lifeData,
        countryOfBirth: lifeData.country,
        cityOfBirth: lifeData.city,
        currentCity: lifeData.city,
        currency: countryData.currency,
        cash: lifeData.startingWealth,
        currentPartnerId: null,
    };
    
    setCharacter(newChar);
    
    const initialLog: GameLogEntry[] = [
        { age: 0, eventDescription: lifeData.parentsBackstory, choiceText: "Begin Life", outcomeNarrative: lifeData.birthNarrative, isPositive: true },
    ];
    setLog(initialLog);
    setGameStatus('playing');
    saveGame(newChar, initialLog);
  };
  
  const handleStartRandom = () => {
    setIsLoading(true);
    const lifeData = getNewRandomLife();
    initializeCharacter(lifeData);
    setIsLoading(false);
  };

  const handleStartCustom = (data: CustomLifeData) => {
    setIsLoading(true);
    const lifeData = getNewCustomLife(data);
    initializeCharacter(lifeData);
    setIsLoading(false);
  };

  const updateCharacter = (updates: Partial<Character>, newLogEntry?: Omit<GameLogEntry, 'age'>) => {
    setCharacter(prevChar => {
        if (!prevChar) return null;

        const newChar: Character = {
            ...prevChar,
            ...updates,
            health: Math.max(0, Math.min(100, updates.health ?? prevChar.health)),
            happiness: Math.max(0, Math.min(100, updates.happiness ?? prevChar.happiness)),
            smarts: Math.max(0, Math.min(100, updates.smarts ?? prevChar.smarts)),
            looks: Math.max(0, Math.min(100, updates.looks ?? prevChar.looks)),
            charisma: Math.max(0, Math.min(100, updates.charisma ?? prevChar.charisma)),
            karma: Math.max(0, Math.min(100, updates.karma ?? prevChar.karma)),
            moral: Math.max(0, Math.min(100, updates.moral ?? prevChar.moral)),
            fame: Math.max(0, Math.min(100, updates.fame ?? prevChar.fame)),
        };

        if (newLogEntry) {
            const entry: GameLogEntry = {
                age: newChar.age,
                ...newLogEntry
            };
            setLog(prevLog => {
                const newLog = [...prevLog, entry];
                saveGame(newChar, newLog);
                return newLog;
            });
        } else {
            saveGame(newChar, log);
        }
        return newChar;
    });
  };
  
  const handleGameOver = (finalCharacterState: Character) => {
      const potentialHeirs = finalCharacterState.npcs.filter(npc => 
          (npc.relationshipType.includes('Son') || npc.relationshipType.includes('Daughter')) &&
          (npc.isAlive ?? true)
      );
      setHeirs(potentialHeirs);
      setFinalCharacter(finalCharacterState);
      localStorage.removeItem(SAVE_KEY);
      setCanLoad(false);
      setGameStatus('game_over');
  };

  const handleAgeUp = () => {
      if (!character) return;
      
      let newHealth = character.health;
      let newHappiness = character.happiness;
      let newCash = character.cash;
      let newBankBalance = character.bankBalance;
      const newAge = character.age + 1;

      // Monthly costs
      const totalMonthlyCost = character.assets.reduce((sum, asset) => sum + asset.monthlyCost, 0);
      newBankBalance -= totalMonthlyCost;
      if (newBankBalance < 0) {
          newCash += newBankBalance;
          newBankBalance = 0;
          if (newCash < 0) {
              newHealth -= 5;
              newHappiness -= 10;
          }
      }

      // Salary
      if (character.currentJob) {
          newBankBalance += character.currentJob.salary;
      }
      
      // Ailment consequences
      character.ailments.forEach(ailment => {
          newHealth += ailment.untreatedConsequences.healthChange;
      });

      // Investment updates
      const { updates } = getMarketUpdate(character.investments);
      const updatedInvestments = character.investments.map(inv => {
          const update = updates.find(u => u.symbol === inv.symbol);
          return update ? { ...inv, currentValuePerShare: update.newPrice } : inv;
      });

      // Age up NPCs once per year and check for death
      let updatedNpcs = [...character.npcs];
      if (newAge > 1 && newAge % 12 === 0) {
        updatedNpcs = updatedNpcs.map(npc => {
            if (npc.isAlive ?? true) {
                const newNpcAge = npc.age + 1;
                // Chance of dying of old age
                if (newNpcAge > 80 && Math.random() < 0.1) {
                    return { ...npc, age: newNpcAge, isAlive: false };
                }
                return { ...npc, age: newNpcAge };
            }
            return npc;
        });
      }
      
      const newCharacterState: Partial<Character> = { 
          age: newAge, 
          health: newHealth, 
          happiness: newHappiness, 
          cash: newCash, 
          bankBalance: newBankBalance,
          investments: updatedInvestments,
          npcs: updatedNpcs,
      };
      
      const finalCharOnDeath = { ...character, ...newCharacterState, isAlive: false };

      if (newAge > 1 && (finalCharOnDeath.health <= 0 || (newAge > 100 * 12 && Math.random() < 0.05))) {
        handleGameOver(finalCharOnDeath);
        return;
      }

      const event = getMonthlyEvent({ ...character, ...newCharacterState });

      if (event) {
          updateCharacter(newCharacterState);
          setCurrentEvent(event);
          setGameStatus('event');
      } else {
          updateCharacter(newCharacterState, {
              eventDescription: "Another month passes.",
              choiceText: "You aged up.",
              outcomeNarrative: "Nothing out of the ordinary happened this month."
          });
      }
  };

  const handleChoice = (eventId: string, choiceIndex: number) => {
    if (!character || !currentEvent) return;
    const choice = currentEvent.choices[choiceIndex];
    const outcome = processChoice(choice);
    setCurrentOutcome(outcome);
    
    const newCharState: Character = { ...character };

    newCharState.health += outcome.healthChange ?? 0;
    newCharState.happiness += outcome.happinessChange ?? 0;
    newCharState.smarts += outcome.smartsChange ?? 0;
    newCharState.looks += outcome.looksChange ?? 0;
    newCharState.charisma += outcome.charismaChange ?? 0;
    newCharState.karma += outcome.karmaChange ?? 0;
    newCharState.moral += outcome.moralChange ?? 0;
    newCharState.fame += outcome.fameChange ?? 0;
    
    if (outcome.wealthChange) {
        newCharState.cash += outcome.wealthChange;
    }
    
    if (outcome.relationshipChange) {
        newCharState.npcs = newCharState.npcs.map(npc => 
            npc.id === outcome.relationshipChange.npcId 
            ? { ...npc, relationshipStatus: Math.max(0, Math.min(100, npc.relationshipStatus + outcome.relationshipChange.change)) }
            : npc
        );
    }
    
    if (outcome.newAilmentId) {
        const newAilment = getAilmentById(outcome.newAilmentId);
        if (newAilment && !newCharState.ailments.find(a => a.id === newAilment.id)) {
            newCharState.ailments.push(newAilment);
        }
    }

    if (outcome.newChild) {
        const isBoy = Math.random() > 0.5;
        const gender = isBoy ? 'Male' : 'Female';
        const countryData = countries.find(c => c.name === newCharState.countryOfBirth);
        const countryNames = countryData ? namesByCountry[countryData.name as keyof typeof namesByCountry] : null;

        const firstName = getRandomElement(
            countryNames 
            ? (gender === 'Male' ? countryNames.male : countryNames.female)
            : (gender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES)
        );
        
        const newChild: NPC = {
            id: `child_${Date.now()}`,
            name: `${firstName} ${newCharState.name.split(' ').pop()}`, // Child gets player's last name
            relationshipType: isBoy ? 'Son' : 'Daughter',
            age: 0,
            relationshipStatus: 100,
            avatar: '👶',
            gender: gender,
            isAlive: true,
        };
        newCharState.npcs.push(newChild);
        if (newCharState.currentPartnerId) {
            newCharState.npcs = newCharState.npcs.map(npc => 
                npc.id === newCharState.currentPartnerId
                ? { ...npc, relationshipStatus: Math.min(100, npc.relationshipStatus + 20) }
                : npc
            );
        }
    }

    if (outcome.startsNewRelationship) {
        const partnerGender = newCharState.gender === 'Male' ? 'Female' : 'Male';
        const firstName = getRandomElement(partnerGender === 'Male' ? MALE_FIRST_NAMES : FEMALE_FIRST_NAMES);
        const lastName = getRandomElement(LAST_NAMES);
        const newPartnerId = `partner_${Date.now()}`;

        const newPartner: NPC = {
            id: newPartnerId,
            name: `${firstName} ${lastName}`,
            relationshipType: partnerGender === 'Male' ? 'Boyfriend' : 'Girlfriend',
            age: Math.floor(newCharState.age / 12),
            relationshipStatus: 80,
            avatar: partnerGender === 'Male' ? '👦' : '👧',
            gender: partnerGender,
            isAlive: true,
        };
        
        if (newCharState.currentPartnerId) {
            newCharState.npcs = newCharState.npcs.map(npc => npc.id === newCharState.currentPartnerId ? { ...npc, relationshipType: npc.gender === 'Male' ? 'Ex-Boyfriend' : 'Ex-Girlfriend' } : npc);
        }
        newCharState.npcs.push(newPartner);
        newCharState.currentPartnerId = newPartnerId;
        outcome.narrative = `You are now dating ${newPartner.name}.`;
    }

    if (outcome.breakup && newCharState.currentPartnerId) {
        const partnerId = newCharState.currentPartnerId;
        newCharState.npcs = newCharState.npcs.map(npc => {
            if (npc.id === partnerId) {
                return { ...npc, relationshipType: npc.gender === 'Male' ? 'Ex-Boyfriend' : 'Ex-Girlfriend', relationshipStatus: 0 };
            }
            return npc;
        });
        newCharState.currentPartnerId = null;
    }
    
    const newEventHistory = [...newCharState.eventHistory, currentEvent.eventId];
    if (newEventHistory.length > 100) {
        newEventHistory.shift();
    }
    newCharState.eventHistory = newEventHistory;

    if(outcome.obituary){
      handleGameOver({ ...newCharState, isAlive: false });
      return;
    }

    updateCharacter(newCharState, {
        eventDescription: currentEvent.description,
        choiceText: choice.text,
        outcomeNarrative: outcome.narrative,
        isPositive: (outcome.happinessChange ?? 0) > 0 || (outcome.healthChange ?? 0) > 0 || (outcome.wealthChange ?? 0) > 0 || (outcome.fameChange ?? 0) > 0
    });
    setGameStatus('outcome');
  };

  const handleContinueAsChild = (childId: string) => {
    if (!finalCharacter) return;
    const childNpc = finalCharacter.npcs.find(n => n.id === childId);
    if (!childNpc) return;

    // 1. Inheritance
    const totalLiquidWealth = finalCharacter.cash + finalCharacter.bankBalance + finalCharacter.investments.reduce((sum, inv) => sum + inv.shares * inv.currentValuePerShare, 0);
    const inheritedWealth = Math.floor(totalLiquidWealth / 2);
    const inheritedAssets = finalCharacter.assets.filter(a => !a.isRented).sort((a,b) => b.marketValue - a.marketValue).slice(0, 1);

    // 2. Determine new character's state
    const ageYears = childNpc.age;
    let occupation = 'Unemployed';
    let educationLevel = 'None';
    if (ageYears >= 18) { educationLevel = 'High School'; }
    else if (ageYears >= 15) { educationLevel = 'Middle School'; occupation = 'High School'; }
    else if (ageYears >= 12) { educationLevel = 'Elementary School'; occupation = 'Middle School'; }
    else if (ageYears >= 5) { educationLevel = 'None'; occupation = 'Elementary School'; }
    else if (ageYears >= 3) { educationLevel = 'None'; occupation = 'Preschool'; }
    else { educationLevel = 'None'; occupation = 'Infant'; }

    // 3. Create the new player character
    const newPlayerCharacter: Character = {
        name: childNpc.name,
        gender: childNpc.gender,
        countryOfBirth: finalCharacter.countryOfBirth,
        cityOfBirth: finalCharacter.cityOfBirth,
        currentCity: finalCharacter.currentCity,
        currency: finalCharacter.currency,
        age: childNpc.age * 12,
        dob: `${(new Date().getFullYear() - childNpc.age)}-${String(getRandomInt(1, 12)).padStart(2, '0')}-${String(getRandomInt(1, 28)).padStart(2, '0')}`,
        health: childNpc.health ?? 100,
        happiness: (childNpc.happiness ?? 70) - 20, // Lower due to parent's death
        smarts: childNpc.smarts ?? getRandomInt(40, 100),
        looks: childNpc.looks ?? getRandomInt(40, 100),
        charisma: getRandomInt(40, 100),
        karma: 50,
        moral: 50,
        fame: Math.floor(finalCharacter.fame / 4),
        personality: childNpc.personality ?? getRandomElement(PERSONALITIES),
        cash: 0,
        bankBalance: inheritedWealth,
        isAlive: true,
        occupation,
        educationLevel,
        educationHistory: [],
        licenses: [],
        assets: inheritedAssets,
        investments: [],
        investmentStats: { totalInvested: 0, totalReturns: 0, ageStartedInvesting: null },
        currentJob: null,
        jobHistory: [],
        jailHistory: [],
        npcs: [],
        currentPartnerId: null,
        ailments: [],
        isOnDiet: false,
        hasCult: false,
        socialMedia: {},
        eventHistory: [],
    };
    
    // 4. Reconstruct the family
    const newNpcs: NPC[] = [];
    // Deceased parent (old player)
    newNpcs.push({
        id: `parent_${finalCharacter.name.replace(/\s/g, '')}`, name: finalCharacter.name,
        relationshipType: finalCharacter.gender === 'Male' ? 'Father' : 'Mother', age: Math.floor(finalCharacter.age / 12),
        relationshipStatus: 100, avatar: finalCharacter.gender === 'Male' ? '👨' : '👩',
        gender: finalCharacter.gender as 'Male' | 'Female', isAlive: false
    });
    // Other parent (if exists and alive)
    const otherParentNpc = finalCharacter.npcs.find(n => n.id === finalCharacter.currentPartnerId);
    if (otherParentNpc && (otherParentNpc.isAlive ?? true)) {
        newNpcs.push({ ...otherParentNpc, relationshipType: otherParentNpc.gender === 'Male' ? 'Father' : 'Mother' });
    }
    // Siblings (other children of the deceased)
    finalCharacter.npcs.forEach(npc => {
        if ((npc.relationshipType.includes('Son') || npc.relationshipType.includes('Daughter')) && npc.id !== childId && (npc.isAlive ?? true)) {
            newNpcs.push({ ...npc, relationshipType: npc.gender === 'Male' ? 'Brother' : 'Sister' });
        }
    });
    newPlayerCharacter.npcs = newNpcs;

    // 5. Reset game state for the new character
    setCharacter(newPlayerCharacter);
    const initialLog: GameLogEntry[] = [{
        age: newPlayerCharacter.age,
        eventDescription: `You have inherited your family's legacy after the passing of your ${finalCharacter.gender === 'Male' ? 'father' : 'mother'}, ${finalCharacter.name}.`,
        choiceText: "Continue Legacy",
        outcomeNarrative: `You inherited ${newPlayerCharacter.currency.symbol}${inheritedWealth.toLocaleString()}.`,
        isPositive: true
    }];
    setLog(initialLog);
    setCurrentEvent(null);
    setCurrentOutcome(null);
    setFinalCharacter(null);
    setHeirs([]);
    setGameStatus('playing');
    saveGame(newPlayerCharacter, initialLog);
  };
  
  const handleApplyForJob = (job: Job) => {
    if (!character) return;
    const newJobHistory = character.currentJob ? [...character.jobHistory, character.currentJob] : character.jobHistory;

    updateCharacter({ 
        currentJob: job, 
        occupation: job.title,
        jobHistory: newJobHistory,
    }, {
        eventDescription: `You started a new job!`,
        choiceText: `Applied for ${job.title}`,
        outcomeNarrative: `You were hired as a ${job.title}, earning ${character.currency.symbol}${job.salary.toLocaleString()}/month.`,
        isPositive: true
    });
    setGameStatus('playing');
  };

  const handlePurchaseAsset = (assetData: Omit<Asset, 'id'>) => {
    if (!character) return;
    
    if (assetData.isRented) {
      if (character.bankBalance < assetData.monthlyCost) {
          alert("You can't afford the first month's rent!");
          return;
      }
      const newAsset: Asset = { ...assetData, id: Date.now().toString() };
      updateCharacter({
          assets: [...character.assets, newAsset],
          bankBalance: character.bankBalance - assetData.monthlyCost
      }, {
          eventDescription: `You started renting a new property.`,
          choiceText: `Rent ${assetData.name}`,
          outcomeNarrative: `You are now renting a ${assetData.name} for ${character.currency.symbol}${assetData.monthlyCost.toLocaleString()}/month. The first month's rent has been paid.`,
          isPositive: true
      });
      setGameStatus('assets');
      return;
    }
    
    if (character.bankBalance < assetData.purchasePrice) {
        alert("You don't have enough money in your bank account to buy this.");
        return;
    }
    
    const newAsset: Asset = { ...assetData, id: Date.now().toString() };
    updateCharacter({
        assets: [...character.assets, newAsset],
        bankBalance: character.bankBalance - assetData.purchasePrice
    }, {
        eventDescription: `You purchased a new asset!`,
        choiceText: `Buy ${assetData.name}`,
        outcomeNarrative: `You are now the proud owner of a ${assetData.name}. It cost ${character.currency.symbol}${assetData.purchasePrice.toLocaleString()}.`,
        isPositive: true
    });
    setGameStatus('assets');
  };
  
  const handleSellAsset = (assetId: string) => {
    if (!character) return;
    const asset = character.assets.find(a => a.id === assetId);
    if (!asset) return;
    
    updateCharacter({
        assets: character.assets.filter(a => a.id !== assetId),
        bankBalance: character.bankBalance + asset.marketValue
    }, {
        eventDescription: `You sold an asset.`,
        choiceText: `Sell ${asset.name}`,
        outcomeNarrative: `You sold your ${asset.name} for ${character.currency.symbol}${asset.marketValue.toLocaleString()}. The money has been transferred to your bank account.`,
        isPositive: true
    });
  };
  
  const handleBuyInvestment = (data: { type: 'Stock' | 'Crypto', name: string, symbol: string, price: number, shares: number }) => {
    if (!character) return;
    const totalCost = data.price * data.shares;
    if (character.bankBalance < totalCost) {
      alert("Not enough funds in bank account.");
      return;
    }
    
    const existingInvestment = character.investments.find(inv => inv.symbol === data.symbol);
    let newInvestments: Investment[];
    
    if (existingInvestment) {
      newInvestments = character.investments.map(inv => {
        if (inv.symbol === data.symbol) {
          const newTotalShares = inv.shares + data.shares;
          const newAvgPrice = ((inv.shares * inv.purchasePricePerShare) + totalCost) / newTotalShares;
          return { ...inv, shares: newTotalShares, purchasePricePerShare: newAvgPrice };
        }
        return inv;
      });
    } else {
      const newInvestment: Investment = {
        id: data.symbol + Date.now().toString(),
        type: data.type,
        name: data.name,
        symbol: data.symbol,
        shares: data.shares,
        purchasePricePerShare: data.price,
        currentValuePerShare: data.price,
      };
      newInvestments = [...character.investments, newInvestment];
    }

    const newInvestmentStats = { ...character.investmentStats };
    newInvestmentStats.totalInvested += totalCost;
    if (newInvestmentStats.ageStartedInvesting === null) {
        newInvestmentStats.ageStartedInvesting = character.age;
    }
    
    updateCharacter({
      investments: newInvestments,
      bankBalance: character.bankBalance - totalCost,
      investmentStats: newInvestmentStats,
    }, {
      eventDescription: `You invested in the market.`,
      choiceText: `Buy ${data.shares} shares of ${data.symbol}`,
      outcomeNarrative: `Your purchase of ${data.symbol} for ${character.currency.symbol}${totalCost.toLocaleString()} was successful.`,
      isPositive: true
    });
  };

  const handleSellInvestment = (investmentId: string, sharesToSell: number) => {
    if (!character) return;
    const investment = character.investments.find(inv => inv.id === investmentId);
    if (!investment || sharesToSell > investment.shares) {
      alert("Invalid sell order.");
      return;
    }
    
    const proceeds = investment.currentValuePerShare * sharesToSell;
    const newInvestments = investment.shares === sharesToSell 
      ? character.investments.filter(inv => inv.id !== investmentId)
      : character.investments.map(inv => inv.id === investmentId ? { ...inv, shares: inv.shares - sharesToSell } : inv);
      
    const newInvestmentStats = { ...character.investmentStats };
    newInvestmentStats.totalReturns += proceeds;

    updateCharacter({
      investments: newInvestments,
      bankBalance: character.bankBalance + proceeds,
      investmentStats: newInvestmentStats,
    }, {
      eventDescription: `You sold some investments.`,
      choiceText: `Sell ${sharesToSell} shares of ${investment.symbol}`,
      outcomeNarrative: `You sold ${sharesToSell.toLocaleString()} shares of ${investment.symbol} for ${character.currency.symbol}${proceeds.toLocaleString()}.`,
      isPositive: true
    });
  };

  const handleInteract = (action: string, npcId: string) => {
    if (!character) return;
    const npc = character.npcs.find(n => n.id === npcId);
    if (!npc) return;

    const { updates, narrative, isPositive, askOutSuccess } = handleNpcInteraction(character, npc, action);

    if (askOutSuccess) {
        let newNpcs = [...(updates.npcs || character.npcs)];
        let newPartnerId: string | null = npcId;
        
        // Demote old partner if exists
        if (character.currentPartnerId) {
            newNpcs = newNpcs.map(n => {
                if (n.id === character.currentPartnerId) {
                    return { ...n, relationshipType: n.gender === 'Male' ? 'Ex-Boyfriend' : 'Ex-Girlfriend' };
                }
                return n;
            });
        }
        
        // Promote new partner
        newNpcs = newNpcs.map(n => {
            if (n.id === npcId) {
                return { ...n, relationshipType: n.gender === 'Male' ? 'Boyfriend' : 'Girlfriend' };
            }
            return n;
        });

        const finalUpdates = { ...updates, npcs: newNpcs, currentPartnerId: newPartnerId };
        
        updateCharacter(finalUpdates, {
            eventDescription: `You interacted with ${npc.name} (${npc.relationshipType}).`,
            choiceText: `You chose to: ${action}`,
            outcomeNarrative: narrative,
            isPositive: isPositive,
        });

    } else {
         updateCharacter(updates, {
            eventDescription: `You interacted with ${npc.name} (${npc.relationshipType}).`,
            choiceText: `You chose to: ${action}`,
            outcomeNarrative: narrative,
            isPositive: isPositive,
        });
    }
  };

  const handleTreatAilment = (ailmentId: string) => {
    if (!character) return;
    const ailment = character.ailments.find(a => a.id === ailmentId);
    if (!ailment || character.bankBalance < ailment.treatmentCost) return;

    const treatmentSucceeded = Math.random() < ailment.treatmentSuccessChance;
    
    updateCharacter({
        bankBalance: character.bankBalance - ailment.treatmentCost,
        ailments: treatmentSucceeded ? character.ailments.filter(a => a.id !== ailmentId) : character.ailments,
        health: treatmentSucceeded ? character.health + 5 : character.health - 2 // small boost for success, small penalty for fail
    }, {
        eventDescription: `You sought medical attention for ${ailment.name}.`,
        choiceText: `Treat ${ailment.name}`,
        outcomeNarrative: treatmentSucceeded 
            ? `The treatment was a success! You are no longer suffering from ${ailment.name}.`
            : `Unfortunately, the treatment was not effective. You paid the doctor, but you are still unwell.`,
        isPositive: treatmentSucceeded,
    });
    setGameStatus('playing');
  };

  const handlePostOnSocialMedia = (platform: SocialMediaPlatform) => {
      if (!character) return;
      const platformStats = character.socialMedia[platform] || { followers: 0, isMonetized: false, isVerified: false, posts: 0 };
      const newFollowers = Math.floor(Math.random() * (character.charisma + character.looks));
      
      updateCharacter({
          socialMedia: {
              ...character.socialMedia,
              [platform]: {
                  ...platformStats,
                  followers: platformStats.followers + newFollowers,
                  posts: platformStats.posts + 1
              }
          },
          happiness: character.happiness + 2,
      }, {
          eventDescription: `You posted on ${platform}.`,
          choiceText: "Create a new post",
          outcomeNarrative: `Your post gained you ${newFollowers} new followers!`,
          isPositive: true
      });
  };
  
  const handleBuyFollowers = (platform: SocialMediaPlatform, amount: number) => {
      if (!character) return;
      const cost = Math.ceil(amount * 0.1); // 10 cents per follower
      if (character.cash < cost) {
          alert("Not enough cash to buy followers.");
          return;
      }
      
      const platformStats = character.socialMedia[platform] || { followers: 0, isMonetized: false, isVerified: false, posts: 0 };
      updateCharacter({
          cash: character.cash - cost,
          socialMedia: {
              ...character.socialMedia,
              [platform]: {
                  ...platformStats,
                  followers: platformStats.followers + amount,
              }
          },
          happiness: character.happiness - 5 // a little guilty
      }, {
          eventDescription: `You bought followers on ${platform}.`,
          choiceText: `Buy ${amount} followers`,
          outcomeNarrative: `Your follower count increased, but your wallet is lighter.`,
          isPositive: false
      });
  };

  const handleVerifyAccount = (platform: SocialMediaPlatform) => {
      if (!character) return;
      const platformStats = character.socialMedia[platform];
      if (!platformStats || platformStats.followers < 100000 || character.charisma < 50) {
          alert("You don't meet the requirements for verification (100k followers, 50 charisma).");
          return;
      }
      updateCharacter({
          socialMedia: {
              ...character.socialMedia,
              [platform]: { ...platformStats, isVerified: true }
          },
          happiness: character.happiness + 20
      }, {
          eventDescription: `You applied for verification on ${platform}.`,
          choiceText: "Get verified",
          outcomeNarrative: `Success! You are now verified on ${platform}.`,
          isPositive: true,
      });
  };
  
  const handleMindBodyActivity = (activity: string) => {
    if (!character) return;
    let updates: Partial<Character> = {};
    let narrative = "";

    switch (activity) {
        case 'diet':
            updates = { isOnDiet: !character.isOnDiet, happiness: character.happiness + (character.isOnDiet ? 5 : -5) };
            narrative = character.isOnDiet ? 'You decided to stop your diet.' : 'You have started a new diet. It might be tough!';
            break;
        case 'gym':
            updates = { health: character.health + 5, looks: character.looks + 2, happiness: character.happiness + 3 };
            narrative = 'You had a great workout at the gym and feel fantastic!';
            break;
        case 'meditate':
            updates = { happiness: character.happiness + 7, health: character.health + 1 };
            narrative = 'You feel calm and centered after a meditation session.';
            break;
        case 'library':
             updates = { smarts: character.smarts + 5 };
             narrative = 'You spent a quiet afternoon at the library and learned a few new things.';
             break;
        default:
             alert("This activity is coming soon!");
             return;
    }

    updateCharacter(updates, {
        eventDescription: `You decided to focus on your well-being.`,
        choiceText: `Engage in: ${activity}`,
        outcomeNarrative: narrative,
        isPositive: true,
    });
    setGameStatus('playing');
  };

  const handleAdoptChild = (child: { name: string; age: number; gender: 'Male' | 'Female', health: number, happiness: number, smarts: number, looks: number, personality: string }) => {
    if (!character) return;

    const playerLastName = character.name.split(' ').pop() || 'Smith';
    const childFirstName = child.name.split(' ')[0];

    const newChildNpc: NPC = {
        id: `adopted_${Date.now()}`,
        name: `${childFirstName} ${playerLastName}`,
        relationshipType: child.gender === 'Male' ? 'Adopted Son' : 'Adopted Daughter',
        age: child.age,
        relationshipStatus: 80,
        avatar: '👶',
        gender: child.gender,
        isAlive: true,
        health: child.health,
        happiness: child.happiness,
        smarts: child.smarts,
        looks: child.looks,
        personality: child.personality,
    };

    updateCharacter({
        npcs: [...character.npcs, newChildNpc],
        happiness: character.happiness + 25,
    }, {
        eventDescription: "You visited the adoption center.",
        choiceText: `Adopt ${child.name}`,
        outcomeNarrative: `You have officially adopted ${newChildNpc.name}, a ${child.age}-year-old ${child.gender === 'Male' ? 'boy' : 'girl'}. Welcome to the family!`,
        isPositive: true,
    });
    setGameStatus('playing');
  };

  const handleSaveGame = () => {
    if (character) {
      saveGame(character, log);
      alert("Game Saved!");
    }
  };

  const handleNewLife = () => {
    if (window.confirm("Are you sure you want to start a new life? Your current progress will be lost.")) {
      resetGame();
    }
  };

  const renderContent = () => {
    switch (gameStatus) {
      case 'start':
        return <StartScreen onStartCreation={() => setGameStatus('creating')} onLoadGame={loadGame} canLoad={canLoad} isLoading={isLoading} />;
      case 'creating':
        return <CreateLifeScreen onStartRandom={handleStartRandom} onStartCustom={handleStartCustom} onBack={() => setGameStatus('start')} />;
      case 'playing':
      case 'event':
      case 'outcome':
        if (!character) return <StartScreen onStartCreation={() => setGameStatus('creating')} onLoadGame={loadGame} canLoad={canLoad} isLoading={isLoading} />;
        return <GameScreen 
            character={character} 
            log={log} 
            currentEvent={currentEvent} 
            currentOutcome={currentOutcome} 
            onAgeUp={handleAgeUp}
            onChoice={handleChoice}
            onReturnToGame={() => setGameStatus('playing')}
            gameStatus={gameStatus}
            onNavigateToBank={() => setGameStatus('bank')}
            onNavigateToJob={() => setGameStatus('job')}
            onNavigateToAssets={() => setGameStatus('assets')}
            onNavigateToActivities={() => setGameStatus('activities')}
            onNavigateToRelationships={() => setGameStatus('relationships')}
            onNewLife={handleNewLife}
            onSaveLife={handleSaveGame}
        />;
      case 'game_over':
        return finalCharacter && <GameOverScreen finalCharacterState={finalCharacter} onRestart={resetGame} heirs={heirs} onContinueAsChild={handleContinueAsChild} />;
      case 'bank':
        if (!character) return null;
        return <BankAccountScreen character={character} onUpdateFinances={(newCash, newBankBalance) => updateCharacter({ cash: newCash, bankBalance: newBankBalance })} onBack={() => setGameStatus('playing')} />;
      case 'job':
        if (!character) return null;
        return <JobScreen character={character} onApplyForJob={handleApplyForJob} onBack={() => setGameStatus('playing')} />;
      case 'assets':
        if (!character) return null;
        return <AssetsScreen 
            character={character} 
            onSellAsset={handleSellAsset} 
            onNavigateToRealEstate={() => setGameStatus('real_estate')}
            onNavigateToInvestments={() => setGameStatus('investments')}
            onBack={() => setGameStatus('playing')} />;
      case 'real_estate':
        if (!character) return null;
        return <RealEstateScreen character={character} onPurchaseAsset={handlePurchaseAsset} onBack={() => setGameStatus('assets')} />;
      case 'investments':
         if (!character) return null;
         return <InvestmentsScreen 
            onBack={() => setGameStatus('assets')} 
            onNavigateToPortfolio={() => setGameStatus('investments_portfolio')}
            onNavigateToStats={() => setGameStatus('investments_stats')}
            onNavigateToNews={() => setGameStatus('investments_news')}
            onNavigateToMarket={(type) => { setMarketType(type); setGameStatus('investments_market'); }}
         />;
      case 'investments_portfolio':
          if (!character) return null;
          return <InvestmentPortfolioScreen character={character} onSellInvestment={handleSellInvestment} onBack={() => setGameStatus('investments')} />;
      case 'investments_market':
          if (!character || !marketType) return null;
          return <InvestmentMarketScreen character={character} onBuyInvestment={handleBuyInvestment} onBack={() => setGameStatus('investments')} marketType={marketType} />;
      case 'investments_stats':
          if (!character) return null;
          return <InvestmentStatsScreen character={character} onBack={() => setGameStatus('investments')} />;
      case 'investments_news':
          return <FinancialNewsScreen onBack={() => setGameStatus('investments')} />;
      case 'relationships':
        if (!character) return null;
        return <RelationshipsScreen character={character} onInteract={handleInteract} onBack={() => setGameStatus('playing')} />;
      case 'activities':
        if (!character) return null;
        return <ActivitiesScreen 
            character={character}
            onBack={() => setGameStatus('playing')}
            onNavigateToSocialMedia={() => setGameStatus('social_media')}
            onNavigateToDoctor={() => setGameStatus('doctor')}
            onNavigateToMindAndBody={() => setGameStatus('mind_and_body')}
            onNavigateToLove={() => setGameStatus('love')}
            onNavigateToLicenses={() => setGameStatus('licenses')}
            onNavigateToPremiumActivities={() => setGameStatus('premium_activities')}
            onNavigateToAdoptionCenter={() => setGameStatus('adoption_center')}
            onNavigateToPets={() => setGameStatus('pets')}
            onNavigateToEmigrate={() => setGameStatus('emigrate')}
        />;
       case 'adoption_center':
        if (!character) return null;
        return <AdoptionCenterScreen 
            character={character} 
            onAdoptChild={handleAdoptChild} 
            onBack={() => setGameStatus('activities')} 
        />;
      case 'pets':
        if (!character) return null;
        return <PetsScreen onBack={() => setGameStatus('activities')} />;
      case 'emigrate':
        if (!character) return null;
        return <EmigrateScreen character={character} onBack={() => setGameStatus('activities')} />;
      case 'social_media':
        if (!character) return null;
        return <SocialMediaScreen character={character} onSelectPlatform={(p) => { setSelectedPlatform(p); setGameStatus('platform'); }} onBack={() => setGameStatus('activities')} />;
      case 'platform':
        if (!character || !selectedPlatform) return null;
        return <PlatformScreen 
            character={character} 
            platform={selectedPlatform} 
            onBack={() => setGameStatus('social_media')}
            onPost={handlePostOnSocialMedia}
            onBuyFollowers={handleBuyFollowers}
            onVerify={handleVerifyAccount}
        />;
      case 'doctor':
        if (!character) return null;
        return <DoctorScreen character={character} onTreatAilment={handleTreatAilment} onBack={() => setGameStatus('activities')} />;
      case 'mind_and_body':
        if (!character) return null;
        return <MindAndBodyScreen character={character} onActivity={handleMindBodyActivity} onBack={() => setGameStatus('activities')} />;
      case 'love':
        if (!character) return null;
        return <LoveScreen character={character} onBack={() => setGameStatus('activities')} />;
      case 'licenses':
        if (!character) return null;
        return <LicensesScreen character={character} onBack={() => setGameStatus('activities')} />;
      case 'premium_activities':
        if (!character) return null;
        return <PremiumActivitiesScreen character={character} onBack={() => setGameStatus('activities')} />;
      default:
        return <div>Unhandled game state</div>;
    }
  };

  return <div className="App">{renderContent()}</div>;
}

// FIX: Removed default export in favor of named export.
// export default App;