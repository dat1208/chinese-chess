import { Tokens } from "@/interfaces/tokenInterface";
import { User } from "@/interfaces/userInterface";


//-----------------------------------------------Token------------------------------------------------//
export const setTokens = (tokens: Tokens): void => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };
  
export const getTokens = (): Tokens | null => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  }

  return null;
};
  
//-----------------------------------------------USER------------------------------------------------//

export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userString = localStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString) as User;
    return user;
  }

  return null;
};

//-----------------------------------------------ROOM------------------------------------------------//
export const setRoom = (room: string): void => {
  localStorage.setItem('roomCurrent', room);
}


export const getRoom = (): string | null => {
  const roomId = localStorage.getItem('roomCurrent');

  if (roomId) {
    return roomId;
  }

  return null;
};
