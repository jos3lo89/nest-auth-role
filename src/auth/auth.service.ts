import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: LoginDto) {
    const userFound = await this.userService.findOne(user.email);

    if (!userFound) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userFound.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Correo o contraseña no coinciden');
    }

    const payload = {
      id: userFound.id,
      name: userFound.name,
      role: userFound.role,
      email: userFound.email,
    };
    const token = await this.jwtService.signAsync(payload);

    const { password, ...result } = userFound;

    return { ...result, token };
  }

  async register(user: RegisterDto) {
    const newUser = await this.userService.create({
      email: user.email,
      name: user.name,
      password: await bcrypt.hash(user.password, 10),
      role: user.role,
    });

    return newUser;
  }
}
