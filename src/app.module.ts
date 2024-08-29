import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UsersModule, AuthModule, TaskModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
