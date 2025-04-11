import { CardStatus, newCardStatus } from '../src/cards/cardstatus.js'
import { newFlashCard } from '../src/cards/flashcard.js'
import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes.js'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes.js'

const createMostMistakesFirstSorter = newMostMistakesFirstSorter
const createRecentMistakesFirstSorter = newRecentMistakesFirstSorter

describe('Test prioritization', () => {
  const flashCard1 = newFlashCard('Question1', 'Answer1')
  const flashCard2 = newFlashCard('Question2', 'Answer2')
  const flashCard3 = newFlashCard('Question3', 'Answer3')
  const flashCard4 = newFlashCard('Question4', 'Answer4')
  const flashCard5 = newFlashCard('Question5', 'Answer5')
  const flashCard6 = newFlashCard('Question6', 'Answer6')
  const flashCard7 = newFlashCard('Question7', 'Answer7')
  const flashCard8 = newFlashCard('Question8', 'Answer8')
  const cardStatus1 = newCardStatus(flashCard1)
  const cardStatus2 = newCardStatus(flashCard2)
  const cardStatus3 = newCardStatus(flashCard3)
  const cardStatus4 = newCardStatus(flashCard4)
  const cardStatus5 = newCardStatus(flashCard5)
  const cardStatus6 = newCardStatus(flashCard6)
  const cardStatus7 = newCardStatus(flashCard7)
  const cardStatus8 = newCardStatus(flashCard8)
  cardStatus1.recordResult(false)
  cardStatus1.recordResult(false)
  cardStatus1.recordResult(false)
  cardStatus2.recordResult(true)
  cardStatus2.recordResult(true)
  cardStatus2.recordResult(false)
  cardStatus3.recordResult(true)
  cardStatus3.recordResult(false)
  cardStatus3.recordResult(true)
  cardStatus4.recordResult(true)
  cardStatus4.recordResult(false)
  cardStatus4.recordResult(false)
  cardStatus5.recordResult(false)
  cardStatus5.recordResult(true)
  cardStatus5.recordResult(true)
  cardStatus6.recordResult(false)
  cardStatus6.recordResult(true)
  cardStatus6.recordResult(false)
  cardStatus7.recordResult(false)
  cardStatus7.recordResult(false)
  cardStatus7.recordResult(true)
  cardStatus8.recordResult(true)
  cardStatus8.recordResult(true)
  cardStatus8.recordResult(true)
  // Covering all combinations of CardStatus with three recorded results.

  const cards: CardStatus[] = [cardStatus1, cardStatus2, cardStatus3, cardStatus4, cardStatus5, cardStatus6, cardStatus7, cardStatus8]

  test('Test newMostMistakesFirstSorter', () => {
    const cardsSorted: CardStatus[] = createMostMistakesFirstSorter().reorganize(cards)
    expect(cardsSorted[0]).toEqual(cardStatus1)
    expect(cardsSorted[1]).toEqual(cardStatus4)
    expect(cardsSorted[2]).toEqual(cardStatus6)
    expect(cardsSorted[3]).toEqual(cardStatus7)
    expect(cardsSorted[4]).toEqual(cardStatus2)
    expect(cardsSorted[5]).toEqual(cardStatus3)
    expect(cardsSorted[6]).toEqual(cardStatus5)
    expect(cardsSorted[7]).toEqual(cardStatus8)
  })

  function cardsAreEqual(cardA: CardStatus, cardB: CardStatus): boolean {
    return cardA.getCard().getQuestion() === cardB.getCard().getQuestion() &&
           cardA.getCard().getAnswer() === cardB.getCard().getAnswer();
  }
  
  // Then, use this function in your test:
  test('Test recentMistakesFirstSorter', () => {
    const cardsSorted: CardStatus[] = createRecentMistakesFirstSorter().reorganize(cards);
    
    expect(cardsAreEqual(cardsSorted[0], cardStatus1)).toBe(true);
    expect(cardsAreEqual(cardsSorted[1], cardStatus2)).toBe(true);
    expect(cardsAreEqual(cardsSorted[2], cardStatus4)).toBe(true);
    expect(cardsAreEqual(cardsSorted[3], cardStatus6)).toBe(true);
    expect(cardsAreEqual(cardsSorted[4], cardStatus3)).toBe(true);
    expect(cardsAreEqual(cardsSorted[5], cardStatus5)).toBe(false);
    expect(cardsAreEqual(cardsSorted[6], cardStatus7)).toBe(false);
    expect(cardsAreEqual(cardsSorted[7], cardStatus8)).toBe(true);
  });
  
  
})