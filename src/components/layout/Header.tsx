import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 sticky top-0 z-10">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section - Sidebar toggle and search */}
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          
          <div className="ml-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Right section - Notifications and user menu */}
        <div className="flex items-center">
          {/* Notifications */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="View notifications"
          >
            <i className="fa-solid fa-bell"></i>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
          </button>
          
          {/* Theme toggle */}
          <button
            className="ml-3 p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Toggle theme"
          >
            <i className="fa-solid fa-moon"></i>
          </button>
        </div>
      </div>
    </header>
  );
}