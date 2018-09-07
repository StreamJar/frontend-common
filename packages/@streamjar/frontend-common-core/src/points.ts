// tslint:disable object-literal-sort-keys

export const textualKeys: { [key: string]: string } = {
	tips: 'when someone tipped',
	watch: 'for watching the stream',
	follow: 'for following the channel',
	sub: 'for subscribing',
	death: 'when the streamer died in-game',
	trigger: 'for running a trigger',

	interactive: 'on spawning items',
	messages: 'for speaking in chat',
	moderator: 'given by a moderator',
	offline: 'by being in chat',
	raffle: 'won in a raffle',
	whitelist: 'for whitelisting themself',

	command: 'for running a command',
	boost: 'for buying a boost',
	gift: 'gifted and received',
};

export const icons: { [key: string]: string } = {
	tips: 'money',
	watch: 'live',
	follow: 'user',
	sub: 'user-plus',
	death: 'gamepad',
	trigger: 'gamepad',

	interactive: 'gamepad',
	messages: 'comments',
	moderator: 'paper-plane',
	offline: 'television',
	raffle: 'random',
	whitelist: 'key',

	command: 'star',
	boost: 'rocket',
	gift: 'gift',
};

export const iconsNew: { [key: string]: string } = {
	tips: 'attach_money',
	donate: 'attach_money',
	watch: 'wifi_tethering',
	follow: 'person',
	sub: 'person_add',
	death: 'videogame_asset',
	trigger: 'videogame_asset',

	interactive: 'videogame_asset',
	message: 'chat',
	messages: 'chat',
	moderator: 'comment',
	offline: 'tv',
	raffle: 'thumb_up',
	whitelist: 'format_align_left',

	command: 'stars',
	boost: 'airplanemode_active',
	gift: 'card_giftcard',
};

// tslint:disable-next-line only-arrow-functions
export function getTextualOfPoints(key: string) {
	return textualKeys[key] || key;
}

// tslint:disable-next-line only-arrow-functions
export function getIconOfPoints(key: string, ng2 = false) {
	return (ng2 ? iconsNew[key] : icons[key]) || 'jar';
}
