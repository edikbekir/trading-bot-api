import { Profile, ProfileSchema } from './profile.schema';
import { Proxy, ProxySchema } from './proxy.schema';
import { Cookie, CookieSchema } from './cookie.schema';
import { TwoFA, TwoFASchema } from './2FA.schema';

export const MODELS = [
	{ name: Profile.name, schema: ProfileSchema },
	{ name: Proxy.name, schema: ProxySchema },
	{ name: Cookie.name, schema: CookieSchema },
	{ name: TwoFA.name, schema: TwoFASchema },
];
