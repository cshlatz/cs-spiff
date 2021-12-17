/**
 * Parses a string and counts the occurence of each character in it
 * @param string
 * @returns object
 */
const parse = (phrase) => {
  if (typeof phrase !== 'string') {
    return [];
  }

  let count = {};

  for (const character of phrase) {
    if (count[character]) {
      count[character]++;
    } else {
      count[character] = 1;
    }
  }

  return count;
};

export {
  parse
}
