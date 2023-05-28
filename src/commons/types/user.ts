export interface User {
  id?: number;
  name?: string;
  email?: string;
  bio?: string;
}

export interface UpdateUser {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  bio: string;
}

export interface LoginUser {
  email?: string;
  password?: string;
}

export interface User extends LoginUser {
  name?: string;
}

export interface CreateUser extends User {
  password: string;
  confirmPassword?: string;
}

export interface UserforDomain {
  bio?: string;
  createdAt?: string;
  email?: string;
  googleId?: string;
  id?: number;
  name?: string;
  status?: string;
}

export interface UsertoREST extends UserforDomain {
  deletedAt?: string;
  token?: string;
  updatedAt?: string;
}
