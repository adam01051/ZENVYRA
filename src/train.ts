//mitask zl
function delayHelloWorld(text: string): void {
	setTimeout(function () {
		console.log(text);
	}, 3000);
}

delayHelloWorld("Hello World!");

// function findDisappearedNumbers(arr: number[]): number[] {
// 	const result: number[] = [];

// 	const min = Math.min(...arr);
// 	const max = Math.max(...arr);

// 	for (let i = min; i <= max; i++) {
// 		if (!arr.includes(i)) {
// 			result.push(i);
// 		}
// 	}

// 	return result;
// }

//mitask zg

// function convertToSnakeCase(str: string): string {
// 	return str.toLowerCase().split(" ").join("_");
// }

// console.log(convertToSnakeCase("name should be a string"));

// function capitalizeWords(txt: string): string {
// 	return txt
// 		.split(" ")
// 		.map(function (word) {
// 			if (word.length <= 2) {
// 				return word;
// 			} else {
// 				return word[0].toUpperCase() + word.slice(1);
// 			}
// 		})
// 		.join(" ");
// }

// console.log(capitalizeWords("name should be a string"));

//mitask ze
// function removeDuplicate(str: string): string {
// 	return [...new Set(str)].join("");
// }

// console.log(removeDuplicate("stringg"));

//mitask zd

// function changeNumberInArray(
// 	index: number,
// 	arr: number[],
// 	newValue: number,
// ): number[] {
// 	arr[index] = newValue;
// 	return arr;
// }

// console.log(changeNumberInArray(1, [1, 3, 7, 2], 2));

//mitask zc

// function celsiusToFahrenheit(cel: number): number {
// 	return (cel * 9) / 5 + 32;
// }

// console.log(celsiusToFahrenheit(0)+ "°F");
// console.log(celsiusToFahrenheit(10) + "°F");

//mitask zb

// function randomBetween(min: number, max: number): number {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// console.log(randomBetween(30, 50));

// //mitask z
// function sumEvens(arr: number[]): number {
// 	let sum = 0;

// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] % 2 === 0) {
// 			sum += arr[i];
// 		}
// 	}

// 	return sum;
// }

// // Misollar
// console.log(sumEvens([1, 2, 3])); // 2
// console.log(sumEvens([1, 2, 3, 2])); // 4

// //task y
// function findIntersection(arr1: number[], arr2: number[]): number[] {
// 	return arr1.filter(function (num) {
// 		return arr2.includes(num);
// 	});
// }

// console.log(findIntersection([1, 2, 3], [3, 2, 0]));

// // mitask x

// function countOccurrences(obj: any, key: string): number {
//   let count = 0;

//   const values = Object.values(obj);

//   for (let k in obj) {
//     if (k === key) {
//       count++;
//     }
//   }

//   for (let i = 0; i < values.length; i++) {
//     if (typeof values[i] === "object") {
//       for (let innerKey in values[i] as Record<string, unknown>) {
//         if (innerKey === key) {
//           count++;
//         }
//       }
//     }
//   }

//   return count;
// }

// // Misol
// console.log(
//   countOccurrences(
//     { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
//     "model"
//   )
// ); // 2

// function chunkArray(arr: number[], size: number): number[][] {
// 	const result: number[][] = [];

// 	for (let i = 0; i < arr.length; i += size) {
// 		const chunk = arr.slice(i, i + size);
// 		result.push(chunk);
// 	}

// 	return result;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));

//mitask v

// function countChars(str: string): Record<string, number> {
// 	const result: Record<string, number> = {};

// 	for (let i = 0; i < str.length; i++) {
// 		const char = str[i];

// 		if (result[char] === undefined) {
// 			result[char] = 1;
// 		} else {
// 			result[char]++;
// 		}
// 	}

// 	return result;
// }

// console.log(countChars("hello"));

// mitask u
// function sumOdds(n: number): number {
// 	let count = 0;

// 	for (let i = 1; i <= n; i++) {
// 		if (i % 2 !== 0) {
// 			count++;
// 		}
// 	}

// 	return count;
// }

// console.log(sumOdds(9)); // 4
// console.log(sumOdds(11)); // 5

//mitaks t
// function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {

// 	const merged = arr1.concat(arr2);

// 	merged.sort(function (a, b) {
// 		return a - b;
// 	});

// 	return merged;
// }

// console.log(mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]));

//mitask s

// function missingNumber(arr: number[]): number {
// 	for (let i = 0; i <= arr.length; i++) {
// 		if (!arr.includes(i)) {
// 			return i;
// 		}
// 	}

// 	return -1;
// }

// console.log(missingNumber([3, 0, 1]));

//mitask r
// import restaurantController from './controllers/restaurant.controller';

// function calculate(textt: string): number {
// 	if (!textt.includes("+")) {
// return 0;
// 	}

// 	const result = textt.split("+");

// 	const num1 = Number(result[0].trim());

// 	const num2 = Number(result[1].trim());

// 	return num1 + num2;
// }

// console.log(calculate("1 + 3"));

//mitsk q

// function hasProperty(obj: object, key: string): boolean {
// 	return Object.keys(obj).includes(key);
// }

// console.log(hasProperty({ name: "BMW", model: "M3" }, "model"));
// console.log(hasProperty({ name: "BMW", model: "M3" }, "year"));

//mitask p

// function objectToArray(obj: Record<string, unknown>): [string, unknown][] {
// 	const map = new Map<string, unknown>();

// 	for (const key of Object.keys(obj)) {
// 		map.set(key, obj[key]);
// 	}

// 	return Array.from(map.entries());
// }

// console.log(objectToArray({ a: 10, b: 20 }));

//task o

// function calculateSumOfNumbers(arr: unknown[]): number {
// 	let sum: number = 0;

// 	for (const item of arr) {
// 		if (typeof item === "number") {
// 			sum += item;
// 		}
// 	}

// 	return sum;
// }

// console.log(calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]));

// //task n

// function palindromCheck(str: string): boolean {
// 	let left = 0;
// 	let right = str.length - 1;

// 	while (left < right) {
// 		if (str[left] !== str[right]) {
// 			return false;
// 		}
// 		left++;
// 		right--;
// 	}

// 	return true;
// }

// // Misollar
// console.log(palindromCheck("dad"));
// console.log(palindromCheck("son"));

// // //mitask m
// function getSquareNumbers(numbers: number[]) {
// 	const result = [];

// 	for (const num of numbers) {
// 		result.push({
// 			number: num,
// 			square: num * num,
// 		});
// 	}

// 	return result;
// }

// console.log(getSquareNumbers([1, 2, 3]));

//task l

// function reverseSentence(text: string) {
// 	return text
// 		.split(" ")
// 		.map((word) => word.split("").reverse().join(""))
// 		.join(" ");
// }

// console.log(reverseSentence("we like coding!"));

// //mitask K
// function countVowels(text: string) {
// 	let count = 0;

// 	for (const ch of text) {
// 		if (
// 			ch === "a" ||
// 			ch === "e" ||
// 			ch === "i" ||
// 			ch === "o" ||
// 			ch === "u" ||
// 			ch === "A" ||
// 			ch === "E" ||
// 			ch === "I" ||
// 			ch === "O" ||
// 			ch === "U"
// 		) {
// 			count++;
// 		}
// 	}

// 	return count;
// }

// console.log(countVowels("string"));

// function findLongestWord(text: string) {
// 	let words = text.split(" ");
// 	let long = "";

// 	for (const word of words) {
// 		if (word.length > long.length) {
// 			long = word;
// 		}
// 	}

// 	return long;
// }

// console.log(findLongestWord("I came from Uzbekistan!"));

// //mitask I
// function majorityElement(arr: number[]) {
// 	let maxCount = 0;
// 	let result = arr[0];

// 	for (let i = 0; i < arr.length; i++) {
// 		let count = 0;

// 		for (let j = 0; j < arr.length; j++) {
// 			if (arr[i] === arr[j]) {
// 				count++;
// 			}
// 		}

// 		if (count > maxCount) {
// 			maxCount = count;
// 			result = arr[i];
// 		}
// 	}

// 	return result;
// }

// console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4]));

//mitask  H2-TASK:
/**
Project Standards:
- Logging standars
- Naming standards:
function, method, variable = CAMEL
class => PASCAL
folder => KEBAB
CSS = SNAKE
- Error handling
 */

//traditional api
//rest api
//graphql

// function getDigits(text: string) {
// 	let res = "";

// 	for (const el of text) {
// 		if (el >= "0" && el <= "9" ) {
// 			res = res + el;
// 		}
// 	}
// 	return res;
// }

// console.log(getDigits("m14i1tasdqe43e2rfewr45"));

//mitask H

// function getPositive(arr: number[]) {
// 	let res = "";

// 	for (const number of arr) {
// 		if (number > 0) {
// 			res = res + number;
// 		}
// 	}
// 	return res;
// }

// console.log(getPositive([1, -4, 2]));

//mitask G

// function getHighestIndex(arr:number[]) {
//   let a = arr[0];

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > a) {
//       a = arr[i];
//     }
//   }

//  return arr.indexOf(a);
// }

// console.log(getHighestIndex([5, 21, 12, 21, 8]));
