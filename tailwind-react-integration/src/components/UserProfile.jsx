

function UserProfile() {
    let styles = '';

  return (
    <div className="bg-gray-100 p-8 mx-auto my-20 rounded-lg shadow-lg  md:p-12 max-w-sm ">
      <img className="rounded-full w-24 h-24 mx-auto md:h-36 md:w-36" src="https://via.placeholder.com/150" alt="User" />
      <h1 className="text-lg text-blue-800 my-4 md:text-xl ">John Doe</h1>
      <p className="text-gray-600 text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  )
}

export default UserProfile;