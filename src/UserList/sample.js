const users = [{ name: "1", isActive: true }, { name: "2", isActive: false }];

function checkUserisActive(user) {
  return user.isActive;
}

// const activeUsers = users.filter(function(data) {
//   return checkUserisActive(data);
// });

/* See what i mean by this, we can remove lot of extra functions which just pass data around */
const activeUsers = users.filter(checkUserisActive);

/* this function will not work properly until its passed two arguments, 
so callling add(1) will give us an error 
*/
function add(a, b) {
  return a + b;
}

/* 
    This is now curried!
    if you pass just one argument i.e. add(1) it will return a function waiting for another argument

    so you can do something like this:

    const addByOne = addCurry(1);

    addByeOne(2) -> 3
    addByOne(5) -> 6

*/

function compose(...fns){
    const copyFns = fns.reverse().slice();
    return function composedFun(...args){
        return  copyFns.reduce(function(acc,curr){
                return curr(acc);
        },args)
    }
}
function addCurry(a) {
  return function(b) {
    return a + b;
  };
}

function multiplyCurried(a, b) {
  return function(b) {
    return a * b;
  };
}

/* point free and curried and composed see how they fit together! */

const multiplyAndAdd = compose(addCurry(10), multiplyCurried(4));

console.log(multiplyAndAdd(4)); // 26

const numbers = [1, 2, 3, 4];

/* Its point free now!*/

const newNumbers = numbers.map(addCurry(1));

console.log(newNumbers); // [2 3 4 5]
