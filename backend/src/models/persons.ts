import {  PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  edad!: number;

  @Column()
  equipo!: string;

  @Column()
  estadoCivil!: string;

  @Column()
  nivelDeEstudios!: string;
}
