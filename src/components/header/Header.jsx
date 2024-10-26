

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4 fixed top-0 left-0 w-full z-50 shadow">
      <div className="container px-7 flex justify-between items-center min-w-full">
        {/* Logo */}
        <div className="text-lg font-bold">
          Trading Post
        </div>
        
        {/* Navigation Links */}
        <nav className="space-x-7">
          <a href="/explore" className="hover:underline hover:text-slate-300 text-white">Explore Posts</a>
          <a href="/my-posts" className="hover:underline hover:text-slate-300 text-white">My Posts</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
