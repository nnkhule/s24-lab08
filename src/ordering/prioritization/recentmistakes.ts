import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return [...cards].sort((a, b) => {
        // Ensure there are results for each card
        const resultsA = a.getResults() || [];
        const resultsB = b.getResults() || [];

        // Find the index of the last incorrect answer, or -1 if no incorrect answers
        const lastMistakeA = Math.max(...resultsA.map((result, index) => result === false ? index : -1));
        const lastMistakeB = Math.max(...resultsB.map((result, index) => result === false ? index : -1));

        // Log the sorting process (for debugging purposes)
        console.log(`Sorting: ${a.getCard().getQuestion()} (last mistake: ${lastMistakeA}) vs ${b.getCard().getQuestion()} (last mistake: ${lastMistakeB})`);

        // Return the sorted result based on the most recent mistake
        return lastMistakeB - lastMistakeA; // Higher mistakes (more recent) come first
      });
    }    
  };
};

export { newRecentMistakesFirstSorter }