import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input'
import { useInView } from 'react-intersection-observer';
import { GridPostList, Loader, SearchResults } from '@/components/shared';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import useDebounce from '@/hooks/useDebounce';


const Explore = () => {

  // useInView hook detects when an element is in the viewport
  const { ref, inView } = useInView();

  // Fetch posts data and pagination control (fetchNextPage, hasNextPage) using a custom hook.
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue)

  // useEffect hook triggers when the component is in view and there is no search value.
  // If these conditions are met, it fetches the next page of posts.
  useEffect(()=>{
    if(inView && !searchValue) fetchNextPage();
  },[inView, searchValue])

  if (!posts) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item && item.documents && item.documents.length === 0);

  return (
    <div className='explore-container'>
      <div className="explore-inner_container">

        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className="flex gap-1 px-4 w-full bg-dark-4">
          <img src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search" />
          <Input type='text' placeholder='search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h2 className='body-bold md:h3-bold'>Popular Today</h2>

        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img src="/assets/icons/filter.svg" alt="filter"
            width={20}
            height={20} />
        </div>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents || []}
          />

        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>
        ) : posts.pages.map((item, index) => (
          item && item.documents && item.documents.length > 0 && (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          )
        ))}
      </div>

      {/* Infinite scroll loader that appears when there are more posts to load */}
      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore

