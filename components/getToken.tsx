export async function getAccessToken() {
    try {
      const response = await fetch('http://localhost:3000/auth/token', {
        method: 'GET',
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Failed to retrieve access token');
      }
  
      const accessTokenData = await response.json();
      const accessToken = accessTokenData.accessToken;
      return accessToken;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }