import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, id: string) {
    try {
      console.log({ ...createTaskDto, user_id: id });

      const newTask = await this.prismaService.task.create({
        data: {
          title: createTaskDto.title,
          description: createTaskDto.description,
          author_id: id,
        },
      });

      console.log(newTask);

      return newTask;
    } catch (error) {
      console.log(error);

      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          '  Error al crear la tarea.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error interno del servidor.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll(id: string) {
    try {
      const allTasks = await this.prismaService.task.findMany({
        where: {
          author_id: id,
        },
      });
      return allTasks;
    } catch (error) {
      throw new HttpException(
        'No se pudo listar las tareas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} task`;
  // }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const taskUpdate = await this.prismaService.task.update({
        where: {
          id,
        },
        data: {
          title: updateTaskDto.title,
          description: updateTaskDto.description,
        },
      });

      return taskUpdate;
    } catch (error) {
      throw new HttpException('No se pudo actualizar', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const taskDeleted = await this.prismaService.task.delete({
        where: { id },
      });

      return taskDeleted;
    } catch (error) {
      throw new HttpException('No se pudo eliminar', HttpStatus.BAD_REQUEST);
    }
  }
}
