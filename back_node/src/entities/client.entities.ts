import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
  } from "typeorm";
  import { uuid } from "uuidv4";
  import { User } from "./user.entities";
  import { Contacts } from "./contacts.entities";
  
  @Entity("clients")
  class Clients {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column({ length: 50, nullable:false })
    name: string;
  
    @Column({ length: 50, unique: true })
    email: string;

    @Column({ length: 50 })
    contact: string;

    @Column({ default: true })
    readonly isActive: boolean;
    
    @ManyToOne(() => User, { eager: true })
    user: User;

    @OneToMany(() => Contacts, (contacts) => contacts.clients, {onDelete: "CASCADE", eager: true})
    contacts: Contacts[];

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
  }
  
  export { Clients };