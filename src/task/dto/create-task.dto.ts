import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título no puede estar vacío.' })
  @Length(3, 100, { message: 'El título debe tener entre 3 y 100 caracteres.' })
  title: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  @Length(0, 500, {
    message: 'La descripción no puede exceder los 500 caracteres.',
  })
  description: string;
}
