// tslint:disable-next-line
export function omit<T>(obj: T, keys: string[] | string = []): Partial<T> {
	if (!(keys instanceof Array)) {
		keys = [keys];
	}

	if (!obj || !(obj === Object(obj))) {
		return obj;
	}

	const val = {...(obj as any) };

	keys.forEach(key => {
		if (val.hasOwnProperty(key)) {
			delete val[key];
		}
	});

	return val;
}

// tslint:disable-next-line
export function pick<T>(obj: T, keys: string[] = []): Partial<T> {
	if (!(keys instanceof Array)) {
		keys = [keys];
	}

	if (!obj || !(obj === Object(obj))) {
		return obj;
	}

	const val = {};

	Object.keys(obj).forEach(key => {
		if (keys.indexOf(key) !== -1) {
			val[key] = obj[key];
		}
	});

	return val;
}
