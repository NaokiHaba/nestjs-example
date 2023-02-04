import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ name }: CreateUserDto): Promise<User> {
    return await this.userRepository
      .save({
        name: name,
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}]：ユーザーの登録に失敗しました。`,
        );
      });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find().catch((e) => {
      throw new InternalServerErrorException(
        `[${e.message}]：ユーザーの取得に失敗しました。`,
      );
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository
      .findOne({
        where: { id: id },
      })
      .then((res) => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
