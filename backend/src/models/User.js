import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

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
                timestamps: true,
                underscored: true,
                createdAt: "created_at",
                updatedAt: "updated_at",

                hooks: {
                    beforeCreate: async (user) => {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    },
                    beforeUpdate: async (user) => {
                        if (user.changed("password")) {
                            const salt = await bcrypt.genSalt(10);
                            user.password = await bcrypt.hash(user.password, salt);
                        }
                    }
                }
            }
        );
    }

    // 🔐 método para validar senha no login
    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

export default User;