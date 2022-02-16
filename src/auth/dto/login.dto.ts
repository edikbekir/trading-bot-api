import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ required: true })
    username: string;

    @ApiProperty({ required: true })
    @ApiProperty()
    password: string;
}
