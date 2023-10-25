interface ApiResponse {
    id: string;
    timestamp: string;
    apiVersion: string;
    status: string;
    message: string;
  }
//--------------------------------------------------------------------USER_API----------------------------------------------------------//
interface User{
    _id: string;
      fullname: string;
      email: string;
      username: string;
}

interface UserResponse{
    userResult: User;
    accessToken: string;
    refreshToken: string;
    
}

interface EditUserResponse{
  _id: string,
  username: string,
  fullname: string,
  email: string,
  password: string
}

interface RegisterUserResponse{
  username: string;
  password: string;
  email: string;
  fullname : string;
}

interface ApiUserResponse extends ApiResponse {
    data: UserResponse;
}

interface ApiEditUserResponse extends ApiResponse {
    data: EditUserResponse;
}

interface ApiRegisterUserResponse extends ApiResponse {
    data: RegisterUserResponse;
  }
//----------------------------------------------------------------------------------------------------------------------------------------//



export type { ApiUserResponse, User, ApiRegisterUserResponse , ApiEditUserResponse};