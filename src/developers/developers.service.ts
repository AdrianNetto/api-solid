import { Body, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly repository: Repository<Developer>,
  ) {}

  create(createDeveloperDto: CreateDeveloperDto) {
    const developer = this.repository.create(createDeveloperDto);
    return this.repository.save(developer);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const developer = await this.repository.findOneBy({ id });
    if (!developer) {
      throw new NotFoundException('Developer not found');
    }
    return developer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    this.repository.update(id, updateDeveloperDto);

    return "Developer updated successfully!"
  }

  async remove(id: string) {
    const developer = await this.repository.findOneBy({ id });
    if (!developer) {
      throw new NotFoundException('Developer not found');
    }
    return this.repository.remove(developer);
  }
}
