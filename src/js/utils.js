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
    /*
      {
      path: './2021-03-04-fit2101-final-project.md',
      frontmatter: {
        layout: './../../layouts/PostLayout.astro',
        title: 'FIT2101 Final Project',
        pubDate: '2021-03-04 12:00:00 +0800',
        description: 'In my second year of Software Engineering studies, I embraced AGILE Scrum principles in FIT2101, leading a team project to develop a project management tool for lecturers using Trello and Git. As the QA tester, I ensured project requirements were met and reflected on the potential benefits of incorporating unit testing.',
        author: 'Muhammad Aiman Shamsiemon',
        image: [Object],
        tags: [Array],
        draft: false
      },
      file: 'C:/Users/maima/OneDrive/Desktop/code/astro-blog/src/pages/blog/2021-03-04-fit2101-final-project.md',
      url: '/astro-blog/blog/2021-03-04-fit2101-final-project',
      rawContent: [Function: rawContent],
      compiledContent: [AsyncFunction: compiledContent],
      getHeadings: [Function: getHeadings],
      Content: [Function (anonymous)] {
        isAstroComponentFactory: true,
        moduleId: undefined,
        propagation: undefined
      },
      default: [Function (anonymous)] {
        isAstroComponentFactory: true,
        moduleId: undefined,
        propagation: undefined
      }
    }
    */

    const processedPosts = await Promise.all(
      posts.map((post) => {
        //console.log("~ post", post)
          return {
              ...post,
              path: './'+ post.url.split("/")[3]
          }
      })
    );
    return processedPosts;
  }
  
  const processedPosts = await processPosts(posts)
  //console.log(Object.entries(posts))

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