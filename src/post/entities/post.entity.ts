import { UserEntity } from "../../user/entities/user.entity";
import { OutputBlockData } from "../dto/create-post.dto";
import { CommentEntity } from "../../comment/entities/comment.entity";

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => CommentEntity, (CommentEntity) => CommentEntity.post, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "comments" })
  comments: CommentEntity[];

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
