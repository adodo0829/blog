/**
 * 1.私有属性
 */
class Message {
  #message = "Howdy";

  greet() {
    console.log(this.#message);
  }
}

const greeting = new Message();

greeting.greet(); // Howdy
console.log(greeting.#message); // #message is not defined

/**
 * 2.Nullish Coalescing Operator
 * when the left operand is null or undefined, 取右边的值
 */
let person = {
  profile: {
    name: "",
    age: 0,
  },
};

// OR Operator (||) returns the right operand if the left is falsy.
console.log(person.profile.name || "Anonymous"); // Anonymous
console.log(person.profile.age || 18); // 18

// Nullish Coalescing Operator
console.log(person.profile.name ?? "Anonymous"); // ""
console.log(person.profile.age ?? 18); // 0

/**
 * 3.Optional Chaining Operator
 */
let person = {};

console.log(person.profile.name ?? "Anonymous"); // person.profile is not defined
console.log(person?.profile?.name ?? "Anonymous"); // no error
console.log(person?.profile?.age ?? 18); // no erro

/**
 * 4.Dynamic Import
 * async/await comes with additional functionality to import your dependencies wherever necessary.
 * 节省资源
 */
const add = (num1, num2) => num1 + num2;
export { add };

const doMath = async (num1, num2) => {
  if (num1 && num2) {
    const math = await import("./math.js");
    console.log(math.add(5, 10));
  }
};

doMath(4, 2);
