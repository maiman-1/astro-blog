export function getAllPosts() {
  return Object.values(
    import.meta.glob("./../pages/blog/posts/*.md", { eager: true })
  );
}

//import all posts with .md
export async function getStaticPaths({paginate}) {
    const allPosts = getAllPosts();
    //const allPosts = import.meta.glob("./*.md");
    //console.log("~ allPosts", allPosts)
    const formattedPosts = await formatBlogPosts(allPosts)
    //console.log(allPosts.map((post:any) => post.frontmatter.tags))
    return paginate(formattedPosts, {
        pageSize: 5,
    })

}