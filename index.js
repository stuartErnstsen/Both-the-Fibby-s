const readlineSetup = require("readline");

const readline = readlineSetup.createInterface(process.stdin, process.stdout);

function bothInFib(a, b) {
  //Check numbers are in ascending order first before doing heavy work
  if (a >= b) {
    console.log("Numbers are not in ascending order!");
    return false;
  }

  //----- We keep track if we have seen either number
  let foundA = a === 0; //We check if a is 0 explicity to catch the first fib number because our loop starts at 1 and skips the zero check
  let foundB = false; //B always starts as false because it will get checked by our loop starting at 1

  //----- Initialized starting fib numbers
  lastFib = 0;
  currentFib = 1;

  //Run a loop as long as a or b are not found and our last fib number isn't larger than either of our numbers
  while ((!foundA || !foundB) && (currentFib <= a || currentFib <= b)) {
    //When we see a number that matches ours, mark it as found
    if (a === currentFib) {
      foundA = true;
    }
    if (b === currentFib) {
      foundB = true;
    }

    //Just a neat little console log.
    console.log(
      currentFib,
      a === currentFib || b === currentFib ? "<=== FOUND" : ""
    );

    //Generate the next fib number and update the fib variables
    nextFib = lastFib + currentFib;
    lastFib = currentFib;
    currentFib = nextFib;
  }

  //Return if both a and b are found
  return foundA && foundB;
}

(async () => {
  //Promise ensures our node process will stay running until user has provided input
  await new Promise(async (resolve) => {
    readline.question(
      "Please enter 2 numbers separated by a comma: Example => '1,2' or '5,34': \nInput: ",
      (numbers) => {
        const [num1, num2] = numbers.split(",").map((e) => +e);

        const bothValid = bothInFib(num1, num2);

        if (bothValid) {
          console.log("THEY ARE BOTH VALID!");
        } else {
          console.log("TRY AGAIN NERD!");
        }

        resolve();
        return;
      }
    );
  });
  readline.close();
})();
