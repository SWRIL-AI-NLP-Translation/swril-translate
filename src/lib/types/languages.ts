export const languages = [
	'English',
	'French',
	'German',
	'Mandarin',
	'Japanese',
	'Korean',
	'Spanish',
	'Russian',
	'Portuguese',
] as const;

export type Language = typeof languages[number];