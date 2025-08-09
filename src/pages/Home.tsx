import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full mb-8">
        <i className="fa-solid fa-rocket text-blue-600 dark:text-blue-400 text-4xl"></i>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        欢迎使用AI监控平台
      </h1>
      
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        高效管理和监控您的AI项目，实时掌握项目状态和性能指标
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/projects" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center"
        >
          <i className="fa-solid fa-folder-open mr-2"></i>
          查看我的项目
        </Link>
        
        <Link 
          to="/dashboard" 
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center"
        >
          <i className="fa-solid fa-chart-line mr-2"></i>
          查看仪表盘
        </Link>
      </div>
    </div>
  );
}