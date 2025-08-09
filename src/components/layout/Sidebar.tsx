import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside className="bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className={`font-bold text-xl ${collapsed ? 'hidden' : 'block'}`}>
            AI Monitor
          </h1>
          {collapsed && (
            <div className="flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-blue-600 text-xl"></i>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul>
            <li className="mb-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <i className="fa-solid fa-gauge mr-3"></i>
                <span className={collapsed ? 'hidden' : 'block'}>仪表盘</span>
              </NavLink>
            </li>
            
            <li className="mb-1">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <i className="fa-solid fa-folder mr-3"></i>
                <span className={collapsed ? 'hidden' : 'block'}>项目</span>
              </NavLink>
            </li>
            
            <li className="mb-1">
              <NavLink
                to="/domains"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <i className="fa-solid fa-link mr-3"></i>
                <span className={collapsed ? 'hidden' : 'block'}>域名</span>
              </NavLink>
            </li>
            
            <li className="mb-1">
              <NavLink
                to="/api-keys"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <i className="fa-solid fa-key mr-3"></i>
                <span className={collapsed ? 'hidden' : 'block'}>API Keys</span>
              </NavLink>
            </li>
            
            <li className="mb-1">
              <NavLink
                to="/conversations"
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <i className="fa-solid fa-comments mr-3"></i>
                <span className={collapsed ? 'hidden' : 'block'}>对话分析</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && (
              <>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=user%20avatar%2C%20simple%20icon&sign=5087b61e82d2237131ad11345d6835a7"
                  alt="User avatar"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@example.com
                  </p>
                </div>
              </>
            )}
            {collapsed && (
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=user%20avatar%2C%20simple%20icon&sign=5087b61e82d2237131ad11345d6835a7"
                alt="User avatar"
              />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}