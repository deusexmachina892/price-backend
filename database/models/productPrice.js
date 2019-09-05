export default (sequelize, DataTypes) => {
    const ProductPrice = sequelize.define(
      'ProductPrice',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        discounted_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
        },
      },
      {
        timestamps: true,
        tableName: 'product_price',
      }
    );
  
    ProductPrice.associate = ({ Product }) => {
      ProductPrice.belongsTo(Product, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE'
      });
    };
  
    return ProductPrice;
  };
  