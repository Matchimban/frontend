export const getCookie = (name: string) => {
	if (typeof window === 'undefined') return;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length !== 2) return;

	return parts.pop()?.split(';').shift();
};
