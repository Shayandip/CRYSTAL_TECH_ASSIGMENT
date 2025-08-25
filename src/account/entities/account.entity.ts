import { AIType, DefaultStatus, LoginType, UserRole } from 'src/enum';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  deviceId: string;

  @Column({ type: 'enum', enum: AIType, default: AIType.INACTIVE })
  lastStatus: AIType;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  roles: UserRole;

  @Column({ type: 'enum', enum: LoginType, default: LoginType.PHONE })
  type: LoginType;

  @Column({ type: 'enum', enum: DefaultStatus, default: DefaultStatus.ACTIVE })
  status: DefaultStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.account)
  userPermission: UserPermission[];
}
