import { Model, DataTypes } from "sequelize";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                adress: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: "users",
                schema: "public",

                // ISSO RESOLVE O ERRO
                timestamps: true,
                underscored: true,

                // mapeia corretamente:
                createdAt: "created_at",
                updatedAt: "updated_at"
            }
        );
    }
}

export default User;