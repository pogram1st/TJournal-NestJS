import { UserEntity } from "../../user/entities/user.entity";
import { OutputBlockData } from "../dto/create-post.dto";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";

@Entity("posts")
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "jsonb" })
  body: OutputBlockData[];

  @Column({ nullable: true })
  tags?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity, { nullable: false, eager: true })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
