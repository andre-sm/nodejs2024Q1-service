export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserOperationResult {
  isFailed: boolean; 
  message: string;
  data?: User;
}