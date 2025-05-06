import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
