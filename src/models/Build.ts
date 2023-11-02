import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CharacterClassName } from '../enums/classname';
import { Item as ItemType } from '../types/others/item';
import User from './User';

@Entity()
class Build {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ nullable: false })
  alias!: string;

  @Column({
    type: 'enum',
    enum: CharacterClassName,
    nullable: false,
  })
  className!: CharacterClassName;

  @Column({ type: 'jsonb', nullable: true, default: null })
  head!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  neck!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  shoulder!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  back!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  chest!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  wrist!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  hands!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  waist!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  legs!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  feet!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  finger1!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  finger2!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  trinket1!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  trinket2!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  mainHand!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  offHand!: ItemType;

  @Column({ type: 'jsonb', nullable: true, default: null })
  relic!: ItemType;

  @ManyToOne(() => User, user => user.builds)
  user!: User;
}

export default Build;
