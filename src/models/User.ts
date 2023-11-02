import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Build from './Build';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  role!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Build, build => build.user)
  builds!: Build[];
}

export default User;
