
class JWTHelpler {
  private getPayloadFromToken = (token: string): any => {
    if (!token) { return null; }

    const [, payloadBase64] = token.split('.');
    if (payloadBase64) {
      const payload = JSON.parse(atob(payloadBase64));
      return payload;
    }
    return null;
  }

  public idValid = (token: any): boolean => {
    if (!token) {
      return false;
    }
    try {
      const payload = this.getPayloadFromToken(token);
      if (!payload || !payload.exp) {
        return false;
      }
      const expirationTime = payload.exp * 1000;
      const currentTime = new Date().getTime();
      return expirationTime >= currentTime;
    } catch (error) {
      return false;
    }
  }
}

export const isInvalidToken = (): boolean => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return false;
  }
  if (!new JWTHelpler().idValid(accessToken)) {
    localStorage.removeItem('accessToken');
    return false;
  }

  return true;
};
