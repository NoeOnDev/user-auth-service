import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Index,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

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

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      instance.password = await argon2.hash(instance.password);
    }
  }

  @BeforeUpdate
  static updateTimestamp(instance: User) {
    instance.updatedAt = new Date();
  }
}
