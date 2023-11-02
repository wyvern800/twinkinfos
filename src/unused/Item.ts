import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import AlternativeItem from './AlternativeItem';

@Entity()
class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mainItemId!: number;

  @OneToMany(() => AlternativeItem, alternativeItem => alternativeItem.item)
  alternatives!: AlternativeItem[];
}

export default Item;
