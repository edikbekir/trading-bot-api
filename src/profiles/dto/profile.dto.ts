import { ProxyDto } from './proxy.dto';
import { TwoFADto } from './two-FA.dto';

class Credentials {
    username: string
    password: string;
}

export class ProfileDto {
    id: string;
    name: string;
    credentials: Credentials;
    cookie: { file: string };
    proxy: ProxyDto;
    twoFA: TwoFADto;
}
