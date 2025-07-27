import { useNavigate } from "react-router-dom";
import { Repository } from "../models/repository";
import { useRepoStore } from "../store/repoStore";

function RepoPreviewCard({ repo }: { repo: Repository }) {
  const navigate = useNavigate();
  const updateSelectedRepo = useRepoStore((state: any) => state.setSelectedRepo);

  const handleClick = () => {
    updateSelectedRepo(repo);
    // Navigate to the details page or perform any other action
    navigate(`/repository/${repo.owner.username}/${repo.name}`);

  };

  return (<div
    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200"
    onClick={() => handleClick()} // Make the entire card clickable
  >
    <div>
      <div className="flex items-start mb-4">
        {/* Avatar */}
        <img
          src={repo.owner.avatar_url}
          alt={`${repo.owner.username} avatar`}
          className="w-16 h-16 rounded-full mr-4 border-2 border-blue-400 flex-shrink-0"
        />
        <div className="flex-grow">
          {/* Repository Name */}
          <h2 className="text-xl font-bold text-gray-900 mb-1">{repo.name}</h2>
          {/* Owner/Full Name - using full_name as it's typically "owner/repo" */}
          <p className="text-gray-600 text-sm truncate">{repo.owner.username}</p>
        </div>
      </div>
      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {repo.description || 'No description available.'}
      </p>
    </div>

    <div className="flex justify-between items-center text-gray-600 text-sm mt-auto">
      <div className="flex items-center">
        {/* Star Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
        {/* Stars Count */}
        <span>{repo.stars.toLocaleString()} Stars</span>
      </div>
    </div>
  </div>);
}

export default RepoPreviewCard
  ;