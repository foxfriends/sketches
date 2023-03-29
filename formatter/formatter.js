const format = (strings, ...interpolations) => {
  return (input) => {
    const values = interpolations.map((interpolation) =>
      typeof interpolation === "function" ? interpolation(input) : interpolation
    );
    return strings.reduce(
      (acc, segment, i) => `${acc}${values[i - 1]}${segment}`
    );
  };
};

const uppercase = (s) => s.toUpperCase();
const greetLoudly = format`Hello ${uppercase}`;
console.log(greetLoudly("world"));
