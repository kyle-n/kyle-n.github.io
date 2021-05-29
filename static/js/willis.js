function chooseOne() {
  var set;
  if (arguments.length === 1 && arguments[0].constructor === Array) {
    set = arguments[0]
  } else {
    set = [].slice.call(arguments);
  }
  return set[Math.floor(Math.random() * set.length)];
}

// Willis titles, sourced from IMDB. I picked out the funny-sounding ones
function generateTitle() {
  var adjectives = ['Motherless', 'Air', 'First', 'Precious', 'The', 'Moonrise', 'The Cold', 'Perfect', 'Hammy\'s', 'Boomerang', 'Astronaut', 'Fast Food', '16', 'Lucky', 'Alpha', 'Sin', 'Ocean\'s', 'The Whole', 'Wild', 'True', 'West', 'Grand', 'Hart\'s', 'Unbreakable', 'Disney\'s The', 'The Sixth', 'Last', 'Twelve', 'Four', 'Nobody\'s', 'Color of', 'Pulp', 'Striking', 'The Last', 'Hudson', 'Mortal'];
  var adverbs = ['A Good Day to', 'Hard', 'Live Free or', 'Hard', 'Wild', 'Full', 'Over'];
  var nouns = ['Cornerman', 'Brooklyn', 'Reprisal', 'Kill', 'Marauders', 'Cargo', 'Extraction', 'Casbah', 'Prince', 'Retaliation', 'Fire', 'Kingdom', 'Light of Day', 'Mamba', 'Setup', 'Surrogates', 'Stranger', 'Grindhouse', 'Adventure', 'Farmer', 'Nation', 'Blocks', 'Number', 'Dog', 'City', 'Hostage', 'Yards', 'Rugrats', 'Tears', 'Champion', 'War', 'Bandits', 'Kid', 'Story', 'Sense', 'Breakfast', 'Siege', 'Armageddon', 'Mercury', 'Jackal', 'Man', 'Monkeys', 'Rooms', 'Fool', 'Night', 'Fiction', 'Distance', 'Boy Scout', 'Hawke', 'Thoughts', 'Bonfire', 'Moonlighting'];
  var verbs = ['Rock', 'Die', 'Lay', 'Catch', 'Cop', 'Go', 'Look Who\'s Talking'];
  var postAdjectives = ['of Violence', 'Air', 'in Venice', 'Retaliation', 'with Fire', '2', 'Slevin', 'Wild', 'of the Sun', 'West', 'of Us', 'of Champions', 'Rising', 'of the Vanities'];
  var postAdverbs = ['Hard', 'with Fire', '2', 'with Fire', 'in Venice', '2', 'the Favorite', '.44', 'Out', 'Hard', 'Full Throttle', 'With a Vengeance', 'Too'];
  var seed = Math.floor(Math.random() * 20);
  var title = '';
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

var titleBox = document.getElementById('willis-title-box');

document.getElementById('willis-button').addEventListener('click', function (e) {
  titleBox.innerText = generateTitle();
});
