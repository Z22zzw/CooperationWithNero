import { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import { projectService } from '@/lib/db';
import { domainService } from '@/lib/db';
import { conversationService } from '@/lib/db';

// 模拟的性能数据
const performanceData = [
  { name: '1月', value: 65 },
  { name: '2月', value: 59 },
  { name: '3月', value: 80 },
  { name: '4月', value: 81 },
  { name: '5月', value: 56 },
  { name: '6月', value: 55 },
  { name: '7月', value: 72 },
];

// 饼图颜色
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [domainCount, setDomainCount] = useState(0);
  const [todayConversations, setTodayConversations] = useState(0);
  const [totalConversations, setTotalConversations] = useState(0);
  
  // 加载统计数据
  useEffect(() => {
    const projects = projectService.getAll();
    const domains = domainService.getAll();
    const conversations = conversationService.getAll();
    
    setProjectCount(projects.length);
    setDomainCount(domains.length);
    
    // 计算今天的对话数
    const today = new Date().toISOString().split('T')[0];
    const todayConv = conversations.filter(c => c.date === today);
    setTodayConversations(todayConv.reduce((sum, c) => sum + c.count, 0));
    
    // 计算总对话数
    setTotalConversations(conversations.reduce((sum, c) => sum + c.count, 0));
  }, []);
  
  // 创建统计卡片组件
  const StatCard = ({ 
    title, value, icon, change, isUp = true, color = 'blue' 
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
          <div className={`flex items-center mt-1 text-sm ${
            isUp ? 'text-green-500' : 'text-red-500'
          }`}>
            {isUp ? (
              <i className="fa-solid fa-arrow-up mr-1"></i>
            ) : (
              <i className="fa-solid fa-arrow-down mr-1"></i>
            )}
            <span>{change}% 较上月</span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`}>
          <i className={`fa-solid ${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="px-6 py-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">仪表盘</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          查看您的AI项目和对话分析概览
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="活跃项目" 
          value={projectCount} 
          icon="fa-folder-open" 
          change={12.5} 
          color="blue"
        />
        <StatCard 
          title="已连接域名" 
          value={domainCount} 
          icon="fa-link" 
          change={8.3} 
          color="green"
        />
        <StatCard 
          title="今日对话" 
          value={todayConversations} 
          icon="fa-comments" 
          change={23.7} 
          color="purple"
        />
        <StatCard 
          title="总对话量" 
          value={totalConversations} 
          icon="fa-history" 
          change={15.2} 
          isUp={false}
          color="orange"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">对话趋势</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                日
              </button>
              <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                周
              </button>
              <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                月
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">域名分布</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '项目A', value: 400 },
                    { name: '项目B', value: 300 },
                    { name: '项目C', value: 300 },
                    { name: '项目D', value: 200 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { name: '项目A', color: '#0088FE' },
              { name: '项目B', color: '#00C49F' },
              { name: '项目C', color: '#FFBB28' },
              { name: '项目D', color: '#FF8042' }
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">最近活动</h2>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            查看全部
          </button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-start">
              <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <i className={`fa-solid ${
                  item === 1 ? 'fa-plus' : 
                  item === 2 ? 'fa-edit' : 
                  item === 3 ? 'fa-trash' : 'fa-key'
                }`}></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  {item === 1 ? '创建了新项目' : 
                   item === 2 ? '更新了域名设置' : 
                   item === 3 ? '删除了测试项目' : '生成了新的API密钥'}
                  <span className="font-medium ml-1">
                    {item === 1 ? '电商网站AI助手' : 
                     item === 2 ? 'api.example.com' : 
                     item === 3 ? '测试项目' : '主API密钥'}
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item === 1 ? '今天 10:30' : 
                   item === 2 ? '昨天 15:45' : 
                   item === 3 ? '昨天 09:12' : '2025-08-05 14:22'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}