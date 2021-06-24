export interface ApiResponse {
  status: boolean;
  message: string;
  user?: {
    id: string;
    userGroupId: string;
    firstName: string;
    lastName: string;
  };
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: number;
}
