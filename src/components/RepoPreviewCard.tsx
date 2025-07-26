import { Repository } from "../models/repository";

function RepoPreviewCard({ repo }: { repo: Repository }) {
    return ( <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-50 h-150 mb-4">
        <img
          src={repo.avatar_url}
          alt={`${repo.name} avatar`}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 text-white text-sm font-semibold px-2 py-1 rounded shadow">
          ⭐ {repo.stars}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
      <p className="text-gray-600 mb-4">{repo.description}</p>
    </div>);
}

export default RepoPreviewCard
;