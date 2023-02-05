import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from "typeorm";
  import { uuid } from "uuidv4";
  import { Clients } from "./client.entities";
  
  @Entity("contacts")
  class Contacts {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column({ length: 50 })
    name: string;
  
    @Column({ length: 50, unique: true })
    email: string;

    @Column({ length: 50 })
    contact: string;

    @Column({ default: true })
    readonly isActive: boolean;
    
    @ManyToOne(() => Clients, { eager: true })
    client: Clients;

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
  }
  
  export { Contacts };