import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum UserRole {
  Admin = 'admin',
  Employe = 'employe',
}

export class RegisterDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @IsString({ message: 'El email debe ser una cadena de texto' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password: string;

  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @IsEnum(UserRole, { message: 'El rol debe ser admin o employe' })
  role: UserRole;
}
