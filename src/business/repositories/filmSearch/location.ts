import { Column } from 'typeorm';

export class Location {
  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  description: string;
}
