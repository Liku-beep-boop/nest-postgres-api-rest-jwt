import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { ActiveUserInterface } from '../common/interface/active-user.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto, user: ActiveUserInterface) {
    const breed = await this.validateBreed(createCatDto.breed);

    return await this.catsRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email,
    });
  }

  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.catsRepository.find();
    }

    return await this.catsRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const cat = await this.catsRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException(`Cat not found`);
    }
    this.validateOwnership(cat, user);
    return cat;
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: ActiveUserInterface,
  ) {
    await this.findOne(id, user);
    return await this.catsRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed
        ? await this.validateBreed(updateCatDto.breed)
        : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne(id, user);
    return await this.catsRepository.softDelete({ id });
  }

  private validateOwnership(cat: Cat, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });

    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }

    return breedEntity;
  }
}
