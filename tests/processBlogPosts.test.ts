import { describe, it, expect } from 'vitest';
import { formatBlogPosts } from '../src/js/utils';

describe('formatBlogPosts - Filtering', () => {
    it('should exclude drafts if filterDrafts is true', async () => {
        const mockPosts = {
        './post1.md': async () => ({ frontmatter: { title: 'Post 1', draft: true, pubDate: '2025-03-15' }, content: 'Content 1' }),
        };

        const formattedPosts = await formatBlogPosts(mockPosts, { filterDrafts: true });
        expect(formattedPosts).toHaveLength(0);
    });

    it('should exclude future posts if filterFuturePosts is true', async () => {
        const mockPosts = {
        './post1.md': async () => ({ frontmatter: { title: 'Future Post', pubDate: '3025-03-15' }, content: 'Content' }),
        };

        const formattedPosts = await formatBlogPosts(mockPosts, { filterFuturePosts: true });
        expect(formattedPosts).toHaveLength(0);
    });
});

  describe('formatBlogPosts - Sorting', () => {
    const mockPosts = {
        './post1.md': async () => ({ frontmatter: { pubDate: '2025-03-10' }, content: 'Content 1' }),
        './post2.md': async () => ({ frontmatter: { pubDate: '2025-03-15' }, content: 'Content 2' }),
        };
    
    it('should sort posts by newest first when sortByNew is true', async () => {
        const formattedPosts = await formatBlogPosts(mockPosts);
        expect(formattedPosts[0].frontmatter.pubDate).toBe('2025-03-15');
    });

    it('should sort posts by oldest first when sortByOld is true', async () => {
        const formattedPosts = await formatBlogPosts(mockPosts, { sortByOld: true, sortByNew: false });
        expect(formattedPosts[0].frontmatter.pubDate).toBe('2025-03-10');
    });

    it('should throw an error if both sortByNew and sortByOld are true', async () => {
        await expect(async () =>
            await formatBlogPosts(mockPosts, { sortByNew: true, sortByOld: true })
        ).rejects.toThrow('Cannot sort by both "new" and "old" simultaneously.');
    });
});


describe('formatBlogPosts - Pagination', () => {
    it('should return the correct slice of posts based on limit and pageStart', async () => {
      const mockPosts = {
        './post1.md': async () => ({ frontmatter: { pubDate: '2025-03-10' }, content: 'Content 1' }),
        './post2.md': async () => ({ frontmatter: { pubDate: '2025-03-12' }, content: 'Content 2' }),
        './post3.md': async () => ({ frontmatter: { pubDate: '2025-03-15' }, content: 'Content 3' }),
      };
  
      const formattedPosts = await formatBlogPosts(mockPosts, { limit: 2, pageStart: 1 });
      expect(formattedPosts).toHaveLength(2);
      expect(formattedPosts[0].frontmatter.pubDate).toBe('2025-03-12');
    });
});
  
  