import { fetchGitHubUser } from './services/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchGitHubUser("octocat").then(data => setUser(data));
  }, []);

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}