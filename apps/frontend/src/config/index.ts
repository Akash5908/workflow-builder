const accessToken = localStorage.getItem("access-token");

const config = {
  serverApiUrl: import.meta.env.VITE_SERVER_API_URL!,
  accessToken: accessToken,
};

export default config;
