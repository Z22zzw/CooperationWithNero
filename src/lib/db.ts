import { Database, Project, Domain, APIKey, Conversation } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// 初始化数据库
const initDB = (): Database => {
  const initialData: Database = {
    projects: [],
    domains: [],
    apiKeys: [],
    conversations: []
  };
  
  localStorage.setItem('aiMonitorDB', JSON.stringify(initialData));
  return initialData;
};

// 获取数据库实例
export const getDB = (): Database => {
  const dbStr = localStorage.getItem('aiMonitorDB');
  if (!dbStr) return initDB();
  
  try {
    return JSON.parse(dbStr);
  } catch (error) {
    console.error('Failed to parse database', error);
    return initDB();
  }
};

// 保存数据库实例
const saveDB = (db: Database): void => {
  localStorage.setItem('aiMonitorDB', JSON.stringify(db));
};

// 项目相关操作
export const projectService = {
  getAll: (): Project[] => getDB().projects,
  
  getById: (id: string): Project | undefined => {
    return getDB().projects.find(p => p.id === id);
  },
  
  create: (project: Omit<Project, 'id' | 'createdAt'>): Project => {
    const db = getDB();
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    db.projects.push(newProject);
    saveDB(db);
    return newProject;
  },
  
  update: (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null => {
    const db = getDB();
    const index = db.projects.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    db.projects[index] = {
      ...db.projects[index],
      ...updates
    };
    
    saveDB(db);
    return db.projects[index];
  },
  
  delete: (id: string): boolean => {
    const db = getDB();
    const initialLength = db.projects.length;
    
    // 删除项目及其关联的域名和APIKey
    db.projects = db.projects.filter(p => p.id !== id);
    db.domains = db.domains.filter(d => d.projectId !== id);
    db.apiKeys = db.apiKeys.filter(k => k.projectId !== id);
    
    if (db.projects.length < initialLength) {
      saveDB(db);
      return true;
    }
    
    return false;
  }
};

// 域名相关操作
export const domainService = {
  getAll: (): Domain[] => getDB().domains,
  
  getByProjectId: (projectId: string): Domain[] => {
    return getDB().domains.filter(d => d.projectId === projectId);
  },
  
  getById: (id: string): Domain | undefined => {
    return getDB().domains.find(d => d.id === id);
  },
  
  create: (domain: Omit<Domain, 'id' | 'createdAt'>): Domain => {
    const db = getDB();
    const newDomain: Domain = {
      ...domain,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    db.domains.push(newDomain);
    saveDB(db);
    return newDomain;
  },
  
  update: (id: string, updates: Partial<Omit<Domain, 'id' | 'createdAt'>>): Domain | null => {
    const db = getDB();
    const index = db.domains.findIndex(d => d.id === id);
    
    if (index === -1) return null;
    
    db.domains[index] = {
      ...db.domains[index],
      ...updates
    };
    
    saveDB(db);
    return db.domains[index];
  },
  
  delete: (id: string): boolean => {
    const db = getDB();
    const initialLength = db.domains.length;
    
    // 删除域名及其关联的对话数据
    db.domains = db.domains.filter(d => d.id !== id);
    db.conversations = db.conversations.filter(c => c.domainId !== id);
    
    if (db.domains.length < initialLength) {
      saveDB(db);
      return true;
    }
    
    return false;
  }
};

// APIKey相关操作
export const apiKeyService = {
  getAll: (): APIKey[] => getDB().apiKeys,
  
  getByProjectId: (projectId: string): APIKey[] => {
    return getDB().apiKeys.filter(k => k.projectId === projectId);
  },
  
  getById: (id: string): APIKey | undefined => {
    return getDB().apiKeys.find(k => k.id === id);
  },
  
  create: (apiKey: Omit<APIKey, 'id' | 'createdAt'>): APIKey => {
    const db = getDB();
    const newAPIKey: APIKey = {
      ...apiKey,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    db.apiKeys.push(newAPIKey);
    saveDB(db);
    return newAPIKey;
  },
  
  update: (id: string, updates: Partial<Omit<APIKey, 'id' | 'createdAt'>>): APIKey | null => {
    const db = getDB();
    const index = db.apiKeys.findIndex(k => k.id === id);
    
    if (index === -1) return null;
    
    db.apiKeys[index] = {
      ...db.apiKeys[index],
      ...updates
    };
    
    saveDB(db);
    return db.apiKeys[index];
  },
  
  delete: (id: string): boolean => {
    const db = getDB();
    const initialLength = db.apiKeys.length;
    
    db.apiKeys = db.apiKeys.filter(k => k.id !== id);
    
    if (db.apiKeys.length < initialLength) {
      saveDB(db);
      return true;
    }
    
    return false;
  }
};

// 对话相关操作
export const conversationService = {
  getAll: (): Conversation[] => getDB().conversations,
  
  getByDomainId: (domainId: string): Conversation[] => {
    return getDB().conversations.filter(c => c.domainId === domainId);
  },
  
  create: (conversation: Omit<Conversation, 'id'>): Conversation => {
    const db = getDB();
    const newConversation: Conversation = {
      ...conversation,
      id: uuidv4()
    };
    
    db.conversations.push(newConversation);
    saveDB(db);
    return newConversation;
  },
  
  // 生成模拟对话数据
  generateMockData: (domainId: string, days = 30): void => {
    const db = getDB();
    // 先清除该域名已有的模拟数据
    db.conversations = db.conversations.filter(c => c.domainId !== domainId);
    
    // 生成过去30天的模拟对话数据
    const conversations: Conversation[] = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // 生成10-50次对话的随机数
      const count = Math.floor(Math.random() * 40) + 10;
      
      conversations.push({
        id: uuidv4(),
        domainId,
        date: dateStr,
        count
      });
    }
    
    db.conversations.push(...conversations);
    saveDB(db);
  }
};