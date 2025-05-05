import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class Product {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column()
  category: string;

  @Column({ type: 'text', array: true })
  tags: string[];

  @Column()
  isNew: boolean;

  @Column()
  isSale: boolean;

  @Column()
  discount: number;

  @Column()
  stock: number;

  @Column()
  sku: string;

  @Column()
  dimensions: string;

  @Column({ type: 'text', array: true })
  materials: string[];

  @Column({ type: 'text', array: true })
  colors: string[];

  @Column({ type: 'text', array: true })
  sizes: string[];

  @DeleteDateColumn()
  deletedAt: Date;
}

/* {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @DeleteDateColumn()
  deletedAt: Date;
} */
