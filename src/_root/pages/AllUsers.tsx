import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";
import { useGetUsers } from '../../lib/react-query/queriesAndMutations';

const AllUsers = () => {
  const { toast } = useToast();

  // Use custom hook to fetch users. This returns the data, loading state, and error state
  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  // If there's an error while fetching the users, show a toast notification and stop rendering
  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }
  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers
