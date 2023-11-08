import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Item from './Item';

@Entity()
class AlternativeItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemId!: number;

  @Column()
  priority!: number;

  @ManyToOne(() => Item, item => item.alternatives)
  item!: Item;
}

export default AlternativeItem;
