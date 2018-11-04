const DATA = deepFreeze({
  url: 'https://zwliew.netlify.com/data/',
  types: {
    about: 'about.json',
    projects: 'projects.json',
    blog: 'blog.json',
  },
});

/**
 * Fetches the data for a page
 */
export default async function fetchData(type) {
  if (!DATA.types.hasOwnProperty(type)) {
    console.warn(`Type ${type} is invalid.`);
    return null;
  }

  try {
    const res = await fetch(`${DATA.url}${DATA.types[type]}`);
    const json = await res.json();
    return json[type];
  } catch (err) {
    console.warn(`Failed to fetch data for ${type}.`);
    return null;
  }
}
