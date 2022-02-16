import { ApiProperty } from '@nestjs/swagger';

export class ProxyDto {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    user!: string;

    @ApiProperty()
    password!: string;

    @ApiProperty()
    domain!: string;

    @ApiProperty()
    port!: number;
}
