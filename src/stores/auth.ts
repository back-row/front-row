const backendUrl = import.meta.env.BACKEND_HOST || 'localhost:8000';

export async function login(username: string, password: string) {
  try {
    const response = await fetch(`http://${backendUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const token = response.headers.get('Authorization');

    if (token) {
      localStorage.setItem('Authorization', token);

      console.log('Login successful');
      const response = await fetch(`http://${backendUrl}/users/`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('Authorization')!
        }
      });
      const data = await response.json();
      return data;
    } else {
      console.error('Login failed');
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}
