import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/admin.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getSelf(
    @CurrentUser() user: UserResponseDto,
  ): Promise<UserResponseDto> {
    return UserService.createUserResponseDto(
      await this.userService.findOneByLogin(user.login),
    );
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post()
  public createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }
}
