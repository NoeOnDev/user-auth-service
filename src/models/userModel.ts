import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Index,
  BeforeUpdate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number;

  @Index("idx_users_uuid")
  @Column({
    type: DataType.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    unique: true,
  })
  uuid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Index("idx_users_email")
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
  })
  phone?: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isEmailVerified!: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isPhoneVerified!: boolean;

  @BeforeUpdate
  static updateTimestamp(instance: User) {
    instance.updatedAt = new Date();
  }
}
