import { ApiProperty } from '@nestjs/swagger';

export class TwoFADto {
    @ApiProperty()
    mnemonic!: string;

    @ApiProperty({ required: false })
    isUsed?: boolean;
}
