export const languages = [
	"English","Chinese","Afrikaans", "Armenian","Portuguese","Urdu", "Spanish", "French", "Arabic", "Polish", "Filipino","Croatian","Serbian","Romanian","German","Italian", "Dutch", "Hindi","Korean","Japanese","Persian","Punjabi","Gujarati", "Turkish", "Thai","Russian", "Amharic"
] as const;

export type LanguageType = typeof languages[number];