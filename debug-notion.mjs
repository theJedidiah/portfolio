import { Client } from "@notionhq/client";

const notion = new Client({ auth: "secret_123" });

console.log("--- CORRUPTION CHECK ---");
console.log("Expected Version: 5.4.0");
console.log("Actual 'databases' methods available in memory:");

if (notion.databases) {
  // This prints the list of functions inside notion.databases
  console.log(Object.keys(notion.databases));
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(notion.databases)));
} else {
  console.log("notion.databases is UNDEFINED");
}
console.log("------------------------");