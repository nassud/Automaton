/**
 * AUTOMATON
 * Sebastián Gómez Dussán
 * sgomezd@uniempresarial.edu.co
 */

const STATE_INICIO = "STATE_INICIO";
const STATE_EXTRAS = "STATE_EXTRAS";

const Automaton = {
  processString: (str, graph) => {
    let stateName = STATE_INICIO;
    let state = graph[STATE_INICIO];

    const processChar = (char) => {
      const foundLink = state.links.find((link) => {
        const linkParts = link.split(":");
        const matches = linkParts[0].split("");
        return matches.indexOf(char) !== -1;
      });

      if (foundLink) {
        const linkParts = foundLink.split(":");
        const nextStateName = linkParts[1];
        const nextState = graph[nextStateName];
        console.log(
          `Encontrado link para ${char} en estado ${stateName} hacia estado ${nextStateName}`
        );
        stateName = nextStateName;
        return nextState;
      }
      console.log(`No se encontró link para '${char}'! Ignorando caracter...`);
      return state;
    };

    let isFinal = false;
    str.split("").forEach((char, index, array) => {
      isLast = index === array.length - 1;
      state = processChar(char);
      if (isLast) {
        isFinal = state.isFinal;
      }
    });
    return isFinal;
  },
};

const word = process.argv[2] || "EXIT";
console.log(`Procesar '${word}'`);
const graph = {
  STATE_INICIO: {
    links: ["E:E1", "X:X1", "I:I1", "T:T1"],
    isFinal: false,
  },
  E1: {
    links: ["E:E1", "X:X2", "T:T2", "I:I2"],
    isFinal: false,
  },
  X1: {
    links: ["X:X1", "E:E2", "T:T2", "I:I2"],
    isFinal: false,
  },
  I1: {
    links: ["I:I1", "X:X2", "T:T2", "E:E2"],
    isFinal: false,
  },
  T1: {
    links: ["T:T1", "X:X2", "E:E2", "I:I2"],
    isFinal: false,
  },
  E2: {
    links: ["E:E2", "X:X3", "T:T3", "I:I3"],
    isFinal: false,
  },
  X2: {
    links: ["X:X2", "E:E3", "T:T3", "I:I3"],
    isFinal: false,
  },
  I2: {
    links: ["I:I2", "X:X3", "T:T3", "E:E3"],
    isFinal: false,
  },
  T2: {
    links: ["T:T2", "X:X3", "E:E3", "I:I3"],
    isFinal: false,
  },
  E3: {
    links: ["E:E3", "X:X4", "T:T4", "I:I4"],
    isFinal: false,
  },
  X3: {
    links: ["X:X3", "E:E4", "T:T4", "I:I4"],
    isFinal: false,
  },
  I3: {
    links: ["I:I3", "X:X4", "T:T4", "E:E4"],
    isFinal: false,
  },
  T3: {
    links: ["T:T3", "X:X4", "E:E4", "I:I4"],
    isFinal: false,
  },
  E4: {
    links: ["E:E4", "ITX:" + STATE_EXTRAS],
    isFinal: true,
  },
  X4: {
    links: ["X:X4", "ITE:" + STATE_EXTRAS],
    isFinal: true,
  },
  I4: {
    links: ["I:I4", "ETX:" + STATE_EXTRAS],
    isFinal: true,
  },
  T4: {
    links: ["T:T4", "IEX:" + STATE_EXTRAS],
    isFinal: true,
  },
  STATE_EXTRAS: {
    links: ["EXIT:" + STATE_EXTRAS],
    isFinal: true,
  },
};

const result = Automaton.processString(word, graph);
console.log(result ? "COINCIDE" : "NO COINCIDE");
