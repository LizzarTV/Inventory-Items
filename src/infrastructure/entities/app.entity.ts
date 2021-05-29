import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({ name: 'inventory_item' })
export class AppEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({ default: false, type: 'boolean' })
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ default: null, nullable: true })
    updated_at?: Date | null;

    @DeleteDateColumn({ default: null, nullable: true })
    deleted_at?: Date | null;
}