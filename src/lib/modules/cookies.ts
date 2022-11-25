export class Cookies {
	static create(name: string, value:string) {
		document.cookie = name + '=' + value + '; path=/';
	}
	static delete (name:string) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	}
	static getFrom(cname: string, cookie: string) {
		const name = cname + '=';
		const decodedCookie = decodeURIComponent(cookie);
		const cookies = decodedCookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let c = cookies[i];
			while (c.charAt(0) === ' ') c = c.substring(1);
			if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
		}
		return '';
	}
	static get (cname:string) {
		return Cookies.getFrom(cname, document.cookie)
	}
	static isSignedInFrom(cookie: string) {
		if (Cookies.getFrom('token', cookie)) return true;
		else return false;
	}
	static isSignedIn() {
		return this.isSignedInFrom(document.cookie)
	}	

}