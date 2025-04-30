import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Import the magnifying glass icon
import PropTypes from 'prop-types';
const Sidebar = ({isOpen}) => {
  return (
    (isOpen && 
    <aside className="bg-white text-white w-64 h-full p-4 mt-16 shadow-lg">
      <div>
        {/* Search Bar */}
        <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 mb-4 rounded bg-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500 text-black"
        />
        <button className="p-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 mb-4">
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          </div>
      </div>
    </aside>
    )
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
}
export default Sidebar;
