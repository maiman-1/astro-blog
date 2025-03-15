export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') // change normalized charactes
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Keep only alphanumeric, spaces, and hyphens
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  
export function formatDate(date) {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    throw new Error("Invalid Date"); // You can customize this message as needed
  }
  return parsedDate.toLocaleDateString('en-UK', {
    timeZone: "UTC",
  });
}

export async function  formatBlogPosts(posts, {
  filterDrafts = true,
  filterFuturePosts = true,
  sortByNew = true,
  sortByOld = false,
  limit = undefined,
  pageStart = 0,
} = {}){
  // due to changes in importing, need to call the invoker function
  //console.log(posts);

  async function processPosts(posts) {
    const processedPosts = await Promise.all(
      Object.entries(posts).map(async ([path, loader]) => {
        const file = await loader();
        return {
            path,
            ...file
          }
        }
      )
    );
    return processedPosts;
  }
  
  const processedPosts = await processPosts(posts)

  const filteredPosts = processedPosts.reduce((acc, post) => {
    //console.log(post);
    //get date and draft status
    const {pubDate, draft} = post.frontmatter;
    //filter out drafts
    if (filterDrafts && draft) return acc;
    //filter out if future
    if (filterFuturePosts && new Date(pubDate) > new Date()) return acc;
    //add to acc upon fulfilling the two criteria
    acc.push(post)
    //return acc
    return acc;
  }, [])
  //sort by new, research how to sort by old
  if (sortByNew && sortByOld) {
    throw new Error('Cannot sort by both "new" and "old" simultaneously.');
  }
  if (sortByNew) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate));
  }
  if (sortByOld) {
    filteredPosts.sort((a, b) => new Date(a.frontmatter.pubDate) - new Date(b.frontmatter.pubDate));
  }
  //set the limit
  if (typeof limit == "number"){
    //slice from page start to page start + limit
    return filteredPosts.slice(pageStart, pageStart+limit)
  }
  return filteredPosts;
} 