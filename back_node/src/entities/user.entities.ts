import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import { uuid } from "uuidv4";
  import { Exclude } from "class-transformer";
  import { Clients } from "./client.entities";
  
  @Entity("users")
  class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column({ length: 50 })
    name: string;
  
    @Column({ length: 50, unique: true })
    email: string;
  
    @Column({ length: 120 })
    @Exclude()
    password: string;
  
    @Column({ default: false })
    readonly isAdm: boolean;
  
    @Column({ default: true })
    readonly isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(() => Clients, (clients) => clients.user)
    clients: Clients[];

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
  }
  
  export { User };