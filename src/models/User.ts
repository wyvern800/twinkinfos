import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hashPassword } from '../utils/encryption';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: number | undefined;

  @Column()
  role!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  // Hash password before inserting it into the database
  @BeforeInsert()
  hashPassword(): void {
    this.password = hashPassword(this.password as string);
  }
}

export default User;
