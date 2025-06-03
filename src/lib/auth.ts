export const setAcccessToken = (value: string) => {
	// check if token is valid
	localStorage.setItem("access_token", value);
};

export const getAccessToken = () => {
  	return localStorage.getItem("access_token");
};

// Remove token from localStorage
export const removeToken = () => {
    localStorage.removeItem("access_token");
};