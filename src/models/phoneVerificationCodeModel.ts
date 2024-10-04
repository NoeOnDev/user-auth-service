import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Index,
} from "sequelize-typescript";
import { User } from "./userModel";

@Table({
  tableName: "phone_verification_codes",
  timestamps: true,
  underscored: true,
  createdAt: "created_at",
  updatedAt: false,
})
export class PhoneVerificationCode extends Model<PhoneVerificationCode> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Index("idx_phone_verification_tokens_user_id")
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @Index("idx_phone_verification_tokens_code")
  code!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expires_at!: Date;
}
