import { useState } from 'react'
import { searchUsers, getUserDetails } from '../services/githubService'

const Search = () => {
    const [formData, setFormData] = useState('');
    const [users, setUsers] = useState([]);
    const [detailedUsers, setDetailedUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('')

    const handleChange1 = (e) => {
        setFormData(e.target.value);
    };

    const handleChange2 = (e) => {
        setLocation(e.target.value);
    }

    const handleChange3 = (e) => {
        setMinRepos(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setUsers([]);
        setDetailedUsers([]);
        setPage(1);
        setHasMore(false);

        try {
            const data = await searchUsers({
                username: formData,
                location,
                minRepos,
                page: 1
            });
            if (data.items && data.items.length > 0) {
                setUsers(data.items);
                setHasMore(data.total_count > data.items.length);
                // Fetch details for each user (limit to 10 for performance)
                const detailPromises = data.items.slice(0, 10).map(async (user) => {
                    try {
                        const details = await getUserDetails(user.login);
                        return { ...user, ...details };
                    } catch {
                        return user;
                    }
                });
                const detailed = await Promise.all(detailPromises);
                setDetailedUsers(detailed);
            } else {
                setError('User not found');
            }
        } catch (err) {
            setError('User not found');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setLoading(true);
        setError('');
        try {
            const data = await searchUsers({
                username: formData,
                location,
                minRepos,
                page: nextPage
            });
            if (data.items && data.items.length > 0) {
                setUsers(prev => [...prev, ...data.items]);
                setHasMore(data.total_count > (users.length + data.items.length));
                // Fetch details for each user (limit to 10 for performance)
                const detailPromises = data.items.slice(0, 10).map(async (user) => {
                    try {
                        const details = await getUserDetails(user.login);
                        return { ...user, ...details };
                    } catch {
                        return user;
                    }
                });
                const detailed = await Promise.all(detailPromises);
                setDetailedUsers(prev => [...prev, ...detailed]);
                setPage(nextPage);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            setError('User not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl px-8 pt-8 pb-10 mb-4 w-full max-w-lg border border-blue-200"
            >
                <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">GitHub User Search</h1>
                <input
                    id='search-input'
                    name="input"
                    type="text"
                    placeholder="Username"
                    value={formData}
                    onChange={handleChange1}
                    className="mb-4 w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 text-blue-900 bg-blue-50 font-semibold shadow-sm"
                />
                <input
                    type="text"
                    placeholder='Location'
                    value={location}
                    onChange={handleChange2}
                    className="mb-4 w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 text-blue-900 bg-blue-50 font-semibold shadow-sm"
                />
                <input
                    type="number"
                    placeholder='Min Repositories'
                    value={minRepos}
                    onChange={handleChange3}
                    className="mb-6 w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 text-blue-900 bg-blue-50 font-semibold shadow-sm"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition border border-blue-600 shadow-md text-lg tracking-wide"
                >
                    Search
                </button>
            </form>
            {loading && <p className="text-blue-700 font-extrabold">Loading...</p>}
            {!loading && error && (
                <p className="text-red-500 font-extrabold">Looks like we cant find the user</p>
            )}
            {!loading && !error && detailedUsers.length > 0 && (
                <>
                    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
                        {detailedUsers.map(user => (
                            <div
                                key={user.id}
                                className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border border-blue-200 hover:shadow-2xl transition"
                            >
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="rounded-full w-24 h-24 mb-4 border-4 border-blue-200 shadow"
                                />
                                <h2 className="text-lg font-bold mb-1 text-blue-700">{user.login}</h2>
                                {user.name && <p className="text-blue-900 mb-1 font-semibold">{user.name}</p>}
                                {user.location && <p className="text-blue-500 mb-1 font-semibold">Location: {user.location}</p>}
                                {typeof user.public_repos !== 'undefined' && <p className="text-blue-500 mb-1 font-semibold">Repos: {user.public_repos}</p>}
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline font-bold mt-2"
                                >
                                    View GitHub Profile
                                </a>
                            </div>
                        ))}
                    </div>
                    {hasMore && (
                        <button
                            onClick={handleLoadMore}
                            className="mt-8 px-8 py-3 font-extrabold rounded-lg focus:outline-none focus:shadow-outline transition border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 shadow-md text-lg tracking-wide"
                        >
                            Load More
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default Search;