import { IsString } from 'class-validator';

export class ProductDto {

    @IsString()
    public readonly category_id: string;

    @IsString()
    public readonly name: string;

    @IsString()
    public readonly image: string;

    @IsString()
    public readonly description: string;

    @IsString()
    public readonly owner: string;
}