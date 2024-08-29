import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Auth(Role.ADMIN, Role.EMPLOYE)
  create(
    @Body() createTaskDto: CreateTaskDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get()
  @Auth(Role.ADMIN, Role.EMPLOYE)
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.taskService.findAll(user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskService.findOne(+id);
  // }

  @Put(':id')
  @Auth(Role.ADMIN, Role.EMPLOYE)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Auth(Role.ADMIN, Role.EMPLOYE)
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
