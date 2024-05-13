import { Models } from "appwrite";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Loader, PostCard, UserCard} from '../../components/shared';
import {useGetRecentPosts,useGetUsers} from '../../lib/react-query/queriesAndMutations';

const Home = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);
  
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMorePosts = () => {
    // Fetch more posts
    setPage(page + 1);
  };

  useEffect(() => {
    if (!isPostLoading && posts && posts.documents.length >= page * 10) {
      setHasMorePosts(true);
    } else {
      setHasMorePosts(false);
    }
  }, [isPostLoading, posts, page]);

  

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
              <InfiniteScroll
                dataLength={posts?.documents.length || 0}
                next={fetchMorePosts}
                hasMore={hasMorePosts}
                loader={<Loader />}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>No more posts to load</b>
                  </p>
                }
                scrollThreshold={0.9}
              >
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
              </InfiniteScroll>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
