const client_ID = '71706837af5445deb75ef9b3cf8f6c4b'; // Removed the leading slash
const client_secret = '22dbf891a2de45988d0496138bd84803';
const baseUrl = 'https://api.spotify.com/v1/search';

const getToken = (client_ID, client_secret) => {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${client_ID}&client_secret=${client_secret}` // Moved this from headers to body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(errorInfo => {
        throw new Error('Error getting token: ' + errorInfo.error_description); // Improved error handling
      });
    });
};

const fetchSongs = (searchTerm, searchType, setSongs, setLoading) => {
  setLoading(true);

  const searchUrl = baseUrl + `?q=${searchTerm}&type=${searchType}&market=GB&limit=12&offset=0`;

  if (searchTerm.length > 2) {
    getToken(client_ID, client_secret)
    .then(token => {
      return fetch(searchUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}` 
        },
      })
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorInfo) => {
          console.error('Error details:', errorInfo); 
          setLoading(false);
          throw Error(response.statusText);
        });
      }
      return response.json();
    })
    .then((data) => {
      setSongs(data);
      setLoading(false);
    })
    .catch((error) => {
        console.error('There was an error fetching the data:', error);
        setLoading(false);
    });
  }
};

export default fetchSongs;