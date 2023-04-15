export const now = Date.now; // for webassembly 
export function rnd(max) {
	return Math.floor(Math.random() * max);
}