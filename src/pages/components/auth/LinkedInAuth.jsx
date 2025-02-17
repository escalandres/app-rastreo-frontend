import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { alerta } from '../../js/general';

const LinkedInAuth = () => {
  const handleSuccess = async (data) => {
    console.log(data.code);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/linkedin/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: data.code }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFailure = (error) => {
    console.error("Error:", error);
    alerta.error('Error al iniciar sesión con LinkedIn. Use otra forma de autenticación.');
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/linkedin/callback`,
    onSuccess: handleSuccess,
    scope: "openid r_emailaddress r_liteprofile",
    onError: handleFailure,
  });

  return (
    <button
      className="h-10 flex items-center justify-center py-2.5 border-2 border-gray-100 rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
      onClick={linkedInLogin}
      alt="Sign in with Linked In"
    >
      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
        <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2"/>
      </svg>
    </button>
  );
};

export default LinkedInAuth;
