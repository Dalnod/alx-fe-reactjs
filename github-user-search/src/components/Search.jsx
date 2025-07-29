import { useState } from 'react'
import { getUserDetails } from '../services/githubService'

const Search = () => {
    const [formData, setFormData] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setUser(null);
        try {
            const data = await getUserDetails(formData);
            setUser(data);
        } catch (err) {
            setError('User not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    id='search-input'
                    name="input"
                    type="text"
                    value={formData}
                    onChange={handleChange}
                />
                <label htmlFor="input">Enter Search</label>
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {!loading && error && (
                <p style={{ color: 'red' }}>Looks like we cant find the user</p>
            )}
            {!loading && !error && user && (
                <div style={{ marginTop: '1rem' }}>
                    <img src={user.avatar_url} alt={user.login} width={100} />
                    <h2>{user.name ? user.name : user.login}</h2>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
                </div>
            )}
        </div>
    );
}

export default Search;