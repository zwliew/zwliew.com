const URL = 'https://zwliew.netlify.com/data/';
export const TYPES = Object.freeze({
  about: 'about.json',
});

export async function fetchData(type) {
  if (!TYPES.hasOwnProperty(type)) {
    console.warn(`Type ${type} is invalid.`);
    return null;
  }

  try {
    const res = await fetch(`${URL}${TYPES[type]}`);
    const json = await res.json();
    return json[type];
  } catch (err) {
    console.warn(`Failed to fetch data for ${type}.`);
    return null;
  }
}
