export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-UK', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts, {
  filterDrafts = true,
  filterFuturePosts = true,
  sortByNew = true,
  sortByOld = false,
  limit = undefined,
  pageStart = 0,
} = {}){
  const filteredPosts = posts.reduce((acc, post) => {
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
  if (sortByNew){
    filteredPosts.sort((a,b) => new Date(b.frontmatter.pubDate) - new Date(a.frontmatter.pubDate))
  }
  //set the limit
  if (typeof limit == "number"){
    //slice from page start to page start + limit
    return filteredPosts.slice(pageStart, pageStart+limit)
  }
  return filteredPosts;
} 