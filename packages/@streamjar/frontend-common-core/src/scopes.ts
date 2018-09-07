// tslint:disable object-literal-sort-keys

export const dangerousScopes = [
	'channel:admin:services',
	'channel:admin:bot',
	'channel:admin:settings',
]

export const scopes: { [key: string]: { [key: string]: { [key: string]: string } } } = {
	channel: {
		statistics: {
			view: 'View general channel statistics.',
		},
		commands: {
			modify: 'Update a command\'s permission level.',
			messages: 'Create, edit and delete custom commands with messages.',
		},
		settings: {
			schedule: 'Create, edit and delete scheduled messages.',
			filter: 'Change filter options.',
			warnings: 'Change warning options.',
			points: 'Change point options.',
			ranks: 'Create, edit and delete point boosts.',
			greetings: 'Change notification messages.',
			goals: 'Create, modify and delete goals.',
			layout: 'Modify the layout of public channel pages.',
			song: 'Change the currently playing song.',
			giveaways: 'Handle giveaways, keys, and automatic giveaway settings.',
			quotes: 'View, change and delete quotes.',
		},
		overlay: {
			view: 'View the overlay.',
			edit: 'Create, modify and delete overlay elements and scenes.',
		},
		overlay2: {
			view: 'View the new overlay.',
			edit: 'Create, modify and delete overlay elements and scenes (v2).',
		},
		integrations: {
			interactive: 'Create, change and delete interactive rewards and lists.',
			whitelist: 'Change whitelist options.',
		},
		viewers: {
			manage: 'Change a viewer\'s points and point boost.',
			warnings: 'View, change and delete warnings.',
		},
		followers: {
			manage: 'Hide followers.',
		},
		subscribers: {
			view: 'View all subscribers.',
			manage: 'Hide subscribers.',
		},
		tips: {
			view: 'View all tips and tippers.',
			manage: 'Add and delete tips.',
		},
		uploads: {
			manage: 'Manage media uploads for the account.',
		},
		permissions: {
			roles: 'Alter roles and what permissions roles have access to.',
		},
		admin: {
			test: 'Send test events down the websocket.',
			services: 'Link a platform to the channel.',
			integrations: 'Manage channel integrations.',
			settings: 'Change general channel settings.',
		},
	},
};

// tslint:disable-next-line only-arrow-functions
export function scopesByKey(): { [key: string]: string} {
	const map = {};

	Object.keys(scopes.channel).forEach(scope => {
		Object.keys(scopes.channel[scope]).forEach(endScope => {
			map[`channel:${scope}:${endScope}`] = scopes.channel[scope][endScope];
		});
	})

	return map;
}

// tslint:disable-next-line only-arrow-functions
export function isDangerous(scope: string): boolean {
	return dangerousScopes.indexOf(scope) !== -1;
}
