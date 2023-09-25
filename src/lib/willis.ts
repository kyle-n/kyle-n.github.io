function chooseOne(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)];
}

// Willis titles, sourced from IMDB. I picked out the funny-sounding ones
export function generateTitle(): string {
  const adjectives = ['Motherless', 'Air', 'First', 'Precious', 'The', 'Moonrise', 'The Cold', 'Perfect', 'Hammy\'s', 'Boomerang', 'Astronaut', 'Fast Food', '16', 'Lucky', 'Alpha', 'Sin', 'Ocean\'s', 'The Whole', 'Wild', 'True', 'West', 'Grand', 'Hart\'s', 'Unbreakable', 'Disney\'s The', 'The Sixth', 'Last', 'Twelve', 'Four', 'Nobody\'s', 'Color of', 'Pulp', 'Striking', 'The Last', 'Hudson', 'Mortal'];
  const adverbs = ['A Good Day to', 'Hard', 'Live Free or', 'Hard', 'Wild', 'Full', 'Over'];
  const nouns = ['Cornerman', 'Brooklyn', 'Reprisal', 'Kill', 'Marauders', 'Cargo', 'Extraction', 'Casbah', 'Prince', 'Retaliation', 'Fire', 'Kingdom', 'Light of Day', 'Mamba', 'Setup', 'Surrogates', 'Stranger', 'Grindhouse', 'Adventure', 'Farmer', 'Nation', 'Blocks', 'Number', 'Dog', 'City', 'Hostage', 'Yards', 'Rugrats', 'Tears', 'Champion', 'War', 'Bandits', 'Kid', 'Story', 'Sense', 'Breakfast', 'Siege', 'Armageddon', 'Mercury', 'Jackal', 'Man', 'Monkeys', 'Rooms', 'Fool', 'Night', 'Fiction', 'Distance', 'Boy Scout', 'Hawke', 'Thoughts', 'Bonfire', 'Moonlighting'];
  const verbs = ['Rock', 'Die', 'Lay', 'Catch', 'Cop', 'Go', 'Look Who\'s Talking'];
  const postAdjectives = ['of Violence', 'Air', 'in Venice', 'Retaliation', 'with Fire', '2', 'Slevin', 'Wild', 'of the Sun', 'West', 'of Us', 'of Champions', 'Rising', 'of the Vanities'];
  const postAdverbs = ['Hard', 'with Fire', '2', 'with Fire', 'in Venice', '2', 'the Favorite', '.44', 'Out', 'Hard', 'Full Throttle', 'With a Vengeance', 'Too'];
  const seed = Math.floor(Math.random() * 20);
  let title = '';
  if (seed < 13) {
    if (seed < 10) {
      title += chooseOne(adjectives) + ' ' + chooseOne(nouns);
      if (seed === 0) {
        title += ' ' + chooseOne(postAdjectives);
      }
    } else {
      title += chooseOne(nouns) + ' ' + chooseOne(postAdjectives);
    }
  } else {
    if (seed < 18) {
      title += chooseOne(adverbs) + ' ' + chooseOne(verbs);
      if (seed === 10) {
        title += ' ' + chooseOne(postAdverbs);
      }
    } else {
      title += chooseOne(verbs) + ' ' + chooseOne(postAdverbs);
    }
  }
  return title;
}
