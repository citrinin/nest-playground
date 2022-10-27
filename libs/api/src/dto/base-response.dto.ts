import { BaseEntity } from '@app/core/base.entity';
import { IsDateString, IsString } from 'class-validator';

export abstract class BaseResponseDto<Entity extends BaseEntity> {
  @IsString()
  id: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  protected constructor({ id, createdAt, updatedAt }: Entity) {
    this.id = id;
    this.createdAt = createdAt.toISOString();
    this.updatedAt = updatedAt.toISOString();
  }
}
