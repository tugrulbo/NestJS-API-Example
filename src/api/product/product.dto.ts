import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProductDto {

    @IsString()
    @ApiProperty({
        description: 'The uuid of category',
        type: String
    })
    public readonly category_id: string;


    @IsString()
    @ApiProperty({
        description: 'The name of product',
        type: String
    })
    public readonly name: string;

    @IsString()
    @ApiProperty({
        description: 'The path of image',
        type: String
    })
    public readonly image: string;


    @IsString()
    @ApiProperty({
        description: 'The description of product',
        type: String
    })
    public readonly description: string;

    @IsString()
    @ApiProperty({
        description: 'The uuid of user',
        type: String
    })

    @IsOptional()
    public owner: string;
}