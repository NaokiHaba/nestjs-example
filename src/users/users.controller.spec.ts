import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = {
            id: 1,
            ...dto,
          };
          return user;
        });

      expect(controller.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('findAll()', () => {
    it('should return users', () => {
      const user: User = {
        id: 1,
        name: '太郎',
      };

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [user];
      });

      expect(controller.findAll()).resolves.toEqual([user]);
    });
    it('should return empty array by Not found users', () => {
      const user: User[] = [];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return user;
      });

      expect(controller.findAll()).resolves.toEqual(user);
    });
  });

  describe('findOne()', () => {
    it('should return user', () => {
      const user: User = {
        id: 1,
        name: '太郎',
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(controller.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(controller.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('update()', () => {
    it('should return update result user', () => {
      const dto: CreateUserDto = {
        name: '太郎2',
      };

      const user: User = {
        id: 1,
        name: '太郎2',
      };

      jest.spyOn(service, 'update').mockImplementation(async () => {
        return user;
      });

      expect(controller.update('1', dto)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'update').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      const dto: CreateUserDto = {
        name: '太郎2',
      };

      expect(controller.update('2', dto)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('remove()', () => {
    it('should return remove result', () => {
      const result: DeleteResult = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(service, 'remove').mockImplementation(async () => {
        return result;
      });

      expect(controller.remove('1')).resolves.toEqual(result);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(controller.remove('2')).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
