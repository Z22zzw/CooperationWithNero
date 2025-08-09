export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

export interface Domain {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  projectId: string; // 新增关联字段，关联到项目
}

export interface APIKey {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  projectId: string; // 新增关联字段，关联到项目
}

export interface Conversation {
  id: string;
  count: number;
  date: string; // 新增日期字段，用于时间序列分析
  domainId: string; // 新增关联字段，关联到域名
}

// 定义数据库结构接口
export interface Database {
  projects: Project[];
  domains: Domain[];
  apiKeys: APIKey[];
  conversations: Conversation[];
}