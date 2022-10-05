const readlineSetup = require("readline");

const readline = readlineSetup.createInterface(process.stdin, process.stdout);

function bothInFib(a, b) {
  let [foundA, foundB] = [a === 0 ? true : false, b === 0 ? true : false];

  lastFib = 0;
  currentFib = 1;

  while ((!foundA || !foundB) && (currentFib <= a || currentFib <= b)) {
    if (a === currentFib) {
      foundA = true;
    }
    if (b === currentFib) {
      foundB = true;
    }
    console.log(currentFib);
    nextFib = lastFib + currentFib;
    lastFib = currentFib;
    currentFib = nextFib;
  }

  return foundA && foundB;
}

(async () => {
  await new Promise(async (resolve) => {
    readline.question("Please 2 numbers: ", (numbers) => {
      const [num1, num2] = numbers.split(",").map((e) => +e);

      if (num1 >= num2) {
        console.log("YOU SUCK, BOZO");
        console.log("Numbers are not in asc order!");
        resolve(false);
        return;
      }

      const bothValid = bothInFib(num1, num2);

      if (bothValid) {
        console.log("THEY ARE BOTH VALID");
      } else {
        console.log("YOU SUCK, BOZO");
      }

      resolve();
      return;
    });
  });
  readline.close();
})();
