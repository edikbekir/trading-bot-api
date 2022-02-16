import { ApiProperty } from '@nestjs/swagger';

import { ProxyDto } from './proxy.dto';
import { TwoFADto } from './two-FA.dto';

class Credentials {
    @ApiProperty()
    username: string

    @ApiProperty()
    password: string;
}

export class CreateProfileDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ type: Credentials })
    credentials: Credentials;

    @ApiProperty({ description: 'Cookies base64', title: 'Cookie' })
    file: string;

    @ApiProperty({ type: ProxyDto })
    proxy!: ProxyDto;

    @ApiProperty({ type: TwoFADto })
    twoFA: TwoFADto;
}
