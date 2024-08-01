const YOUR_CLIENT_ID = '288950244855-qivl0vi990dlcj5lg8h7k2r1mhmfqid2.apps.googleusercontent.com';
const YOUR_REDIRECT_URI = 'http://localhost:5173/YoutubeHomePage/SignInPage/oauth2/code/google';
const SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';

// Generate a random state value for security
function generateCryptoRandomState() {
  const randomValues = new Uint32Array(2);
  window.crypto.getRandomValues(randomValues);
  const utf8Encoder = new TextEncoder();
  const utf8Array = utf8Encoder.encode(String.fromCharCode.apply(null, randomValues));
  return btoa(String.fromCharCode.apply(null, utf8Array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Start OAuth 2.0 flow
export function oauth2SignIn() {
  const state = generateCryptoRandomState();
  localStorage.setItem('state', state);

  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = {
    client_id: YOUR_CLIENT_ID,
    redirect_uri: YOUR_REDIRECT_URI,
    scope: SCOPE,
    state: state,
    include_granted_scopes: 'true',
    response_type: 'token',
  };

  const form = document.createElement('form');
  form.setAttribute('method', 'GET');
  form.setAttribute('action', oauth2Endpoint);

  for (const p in params) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

// Try sample request with access token
export function trySampleRequest() {
  const params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params.access_token) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&access_token=${params.access_token}`);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}

// Check token scope and initiate OAuth if necessary
export function checkTokenScope() {
  const params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  let currentScopeGranted = false;

  if (params && params.scope) {
    const scopes = params.scope.split(' ');
    currentScopeGranted = scopes.includes(SCOPE);
  }

  if (!currentScopeGranted) {
    oauth2SignIn();
  }
}

// Revoke access token
export function revokeAccess(accessToken) {
  const revokeTokenEndpoint = 'https://oauth2.googleapis.com/revoke';
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', revokeTokenEndpoint);

  const tokenField = document.createElement('input');
  tokenField.setAttribute('type', 'hidden');
  tokenField.setAttribute('name', 'token');
  tokenField.setAttribute('value', accessToken);
  form.appendChild(tokenField);

  document.body.appendChild(form);
  form.submit();
}
