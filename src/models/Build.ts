import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharacterClassName } from '../enums/classname';
import { Item as ItemType } from '../types/others/item';
import User from './User';
import { CharacterRaceAlliance, CharacterRaceHorde } from '../enums/race';
import { Brackets } from '../enums/brackets';

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
    default: CharacterClassName.Hunter,
  })
  className!: CharacterClassName;

  @Column({
    type: 'enum',
    enum: CharacterRaceHorde,
    nullable: false,
    default: CharacterRaceHorde.Orc,
  })
  hordeRace!: CharacterRaceHorde;

  @Column({
    type: 'enum',
    enum: CharacterRaceAlliance,
    nullable: false,
    default: CharacterRaceAlliance.Human,
  })
  allianceRace!: CharacterRaceAlliance;

  @Column({
    type: 'enum',
    enum: Brackets,
    nullable: false,
    default: Brackets.NINETEEN,
  })
  bracket!: Brackets;

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

  @Column({ type: 'jsonb', nullable: true, default: null })
  ranged!: ItemType;

  @ManyToOne(() => User, user => user.builds)
  user!: User;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;
}

export default Build;
