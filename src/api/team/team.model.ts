/**
 * Created by sasha on 6/20/17.
 */
"use strict";
const Sequilize = require("sequelize");

export class Team extends Sequilize.Model{
    public static associate(models)  {
        console.log("Team.associate");
    }
}
export default function(sequelize, DataTypes) {
    Team.init({
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "_id",
            },
            unique: "compositeIndex",
        },
        teamName: {
            type: DataTypes.STRING,
        },
        projectId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Projects",
                key: "_id",
            },
            unique: "compositeIndex",
        },
        accessRights: {
            type: DataTypes.ENUM,
            values: ["user", "admin", "creator"],
            defaultValue: "user",
        },
    }, {
        sequelize,
    });
    return Team;
}
