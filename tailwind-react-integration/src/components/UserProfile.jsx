

function UserProfile() {
    let styles = '';

  return (
    <div className="bg-gray-100 sm:p-4 max-w-xs mx-auto my-20 rounded-lg shadow-lg  md:p-8 md:max-w-sm ">
      <img className="rounded-full sm:w-24 sm:h-24 mx-auto md:h-36 md:w-36" src="https://via.placeholder.com/150" alt="User" />
      <h1 className="text-lg text-blue-800 my-4 md:text-xl ">John Doe</h1>
      <p className="text-gray-600 text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  )
}

export default UserProfile;