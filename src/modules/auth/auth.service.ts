import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<UserResponseDto> {
    const user = await this.userService.findOneByLogin(login);
    if (user && (await bcrypt.compare(pass, user.hash))) {
      return UserService.createUserResponseDto(user);
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.login, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Incorrect login or password');
    }
    return {
      jwt: this.jwtService.sign(user),
    };
  }
}
