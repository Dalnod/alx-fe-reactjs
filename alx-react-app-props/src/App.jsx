import UserContext from './UserContext';
import ProfilePage from './ProfilePage';

function App() {
  const userData = {Phone: "09079713507", name: "Erharhine Donald", email: "donerharhine@gmail.com"
   };

  return (
    <UserContext.Provider value = {userData}>
      <ProfilePage />
    </UserContext.Provider>
  ); 
}

export default App; 