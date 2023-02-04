import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    comment: 'アカウントID',
  })
  readonly id: number;

  @Column('varchar', { comment: 'アカウント名' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
