import Sequelize, { Model } from "sequelize";

class User extends Model {
    static init(sequelize) {

        super.init(
            
            {
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                adress: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
            },
            {
                sequelize
            }
        );

    }
}

export default User;