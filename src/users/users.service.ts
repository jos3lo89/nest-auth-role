import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.prismaService.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (userFound) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const newUSer = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        role: createUserDto.role,
      },
    });

    return newUSer;
  }

  findOne(email: string) {
    const userFound = this.prismaService.user.findUnique({ where: { email } });
    return userFound;
  }
}
