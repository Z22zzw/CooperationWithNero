import { useState, useEffect } from 'react';

import { toast } from 'sonner';
import { projectService } from '@/lib/db';
import { Project } from '@/types';

// 项目表格组件
const ProjectTable = ({ 
  projects, 
  onEdit, 
  onDelete 
}) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <i className="fa-solid fa-folder-open text-gray-400 text-xl"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">暂无项目</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          您还没有创建任何项目，请点击"新建项目"按钮开始
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                项目名称
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                创建时间
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <i className="fa-solid fa-folder text-blue-600 dark:text-blue-400"></i>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {project.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(project.createdAt).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    活跃
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(project)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState('');
  
  // 加载项目列表
  useEffect(() => {
    const loadProjects = () => {
      setProjects(projectService.getAll());
    };
    
    loadProjects();
  }, []);
  
  // 打开新建/编辑对话框
  const openDialog = (project: Project | null = null) => {
    setCurrentProject(project);
    setProjectName(project?.name || '');
    setIsDialogOpen(true);
  };
  
  // 关闭对话框
  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentProject(null);
    setProjectName('');
  };
  
  // 保存项目
  const saveProject = () => {
    if (!projectName.trim()) {
      toast.error('项目名称不能为空');
      return;
    }
    
    try {
      if (currentProject) {
        // 更新现有项目
        const updated = projectService.update(currentProject.id, { name: projectName });
        if (updated) {
          setProjects(projects.map(p => p.id === updated.id ? updated : p));
          toast.success('项目更新成功');
        } else {
          toast.error('更新项目失败');
        }
      } else {
        // 创建新项目
        const newProject = projectService.create({ name: projectName });
        setProjects([...projects, newProject]);
        toast.success('项目创建成功');
      }
      
      closeDialog();
    } catch (error) {
      console.error('保存项目失败', error);
      toast.error('保存项目失败，请重试');
    }
  };
  
  // 删除项目
  const deleteProject = (id: string) => {
    if (window.confirm('确定要删除此项目吗？相关的域名和API密钥也将被删除。')) {
      try {
        const deleted = projectService.delete(id);
        if (deleted) {
          setProjects(projects.filter(p => p.id !== id));
          toast.success('项目删除成功');
        } else {
          toast.error('删除项目失败');
        }
      } catch (error) {
        console.error('删除项目失败', error);
        toast.error('删除项目失败，请重试');
      }
    }
  };
  
  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">项目管理</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            创建和管理您的AI监控项目
          </p>
        </div>
        <button 
          onClick={() => openDialog()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <i className="fa-solid fa-plus mr-2"></i>新建项目
        </button>
      </div>
      
      <ProjectTable 
        projects={projects} 
        onEdit={openDialog} 
        onDelete={deleteProject} 
      />
      
      {/* 新建/编辑项目对话框 */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentProject ? '编辑项目' : '新建项目'}
              </h2>
              
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    项目名称
                  </label>
                  <input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="输入项目名称"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={closeDialog}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  取消
                </button>
                <button 
                  onClick={saveProject}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {currentProject ? '更新' : '创建'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}