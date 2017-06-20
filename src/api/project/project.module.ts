/**
 * Created by sasha on 6/20/17.
 */
'use strict';

export default function(sequelize, DataTypes) {
    return sequelize.define('Project', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        info: DataTypes.STRING,
        active: DataTypes.BOOLEAN,

    },{
        classMethods:{
            associate: (models) => {

            }
        }
    });
}