import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/postgres';
import User from './User.model';

interface ChargerAttributes {
  id: number;
  hostId: number;
  title: string;
  description?: string;
  powerRating: number;
  plugType: string;
  pricePerHour: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  isAvailable: boolean;
  isApproved: boolean;
  availableSlots: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ChargerCreationAttributes extends Optional<ChargerAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Charger extends Model<ChargerAttributes, ChargerCreationAttributes> implements ChargerAttributes {
  public id!: number;
  public hostId!: number;
  public title!: string;
  public description?: string;
  public powerRating!: number;
  public plugType!: string;
  public pricePerHour!: number;
  public address!: string;
  public city!: string;
  public state!: string;
  public pincode!: string;
  public latitude!: number;
  public longitude!: number;
  public imageUrl?: string;
  public isAvailable!: boolean;
  public isApproved!: boolean;
  public availableSlots!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Charger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: 'id' }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    powerRating: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    plugType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricePerHour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    availableSlots: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    sequelize,
    tableName: 'chargers',
    timestamps: true
  }
);

Charger.belongsTo(User, { foreignKey: 'hostId', as: 'host' });

export default Charger;

