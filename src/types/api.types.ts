// Account Types
export interface Account {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  ownerId?: string;
}

// Catalog Types
export interface Area {
  id: string;
  name: string;
  description?: string;
  code?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  order?: number;
}

// Assessment Types
export interface Assessment {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  questionCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'text' | 'scale' | 'matrix';
  options?: string[];
  required?: boolean;
  weight?: number;
}

// Pagination
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
