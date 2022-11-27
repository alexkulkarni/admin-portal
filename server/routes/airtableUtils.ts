/*
"Base" is Airtable lingo for database. 
So this "base id" is the id for the Mott Haven Fridge/Grassroots Groceries Airtable database.
*/
const AIRTABLE_BASE_ID_PROD = "app7zige4DRGqIaL2";
const AIRTABLE_BASE_ID_DEV = "app18BBTcWqsoNjb2";
//"Base" here just has the normal definition
export const AIRTABLE_URL_BASE = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID_DEV}`;

// //Generic fetch call to Airtable
// export const fetchAirtableData = async <T>(url: string) => {
//   const response = await fetch(url, {
//     headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
//   });
//   return response.json() as T;
// };