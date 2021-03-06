/**
 * Created by sasha on 7/8/17.
 */
import {expect, use}  from "chai";
import {Promise} from "sequelize";
import {spy, stub} from "sinon";
import {ServerError} from "../../../src/models/IError";
use(require("sinon-chai"));
use(require("chai-as-promised"));
use(require("chai-things"));


describe("Check project.helpers", function() {
    const proxyquire = require("proxyquire");
    const dbSpec = {
        Team: {
            findAll: stub(),
        },
    };
    const serviceStub = proxyquire("../../../src/api/project/project.helpers.ts", {
        "../../sqldb": {db: dbSpec},
    });
    it("should return  ServerError error", function() {
        dbSpec.Team.findAll.returns(Promise.resolve([]));
        expect(serviceStub.checkProjectAccessRights(1, 2)).to.be.rejectedWith(new ServerError("Yo not have access rights for editing this group", 403));
        expect(dbSpec.Team.findAll).to.be.calledWith(
            {
                where: {
                    projectId: 2,
                    userId: 1,
                    accessRights: {
                        $in: ["admin", "creator"],
                    },
                },
            });
    });
    it("should return team if access allow", function() {
        dbSpec.Team.findAll.returns(Promise.resolve([{}]));
        expect(serviceStub.checkProjectAccessRights(1, 2, ["creator"])).to.be.fulfilled;
        expect(dbSpec.Team.findAll).to.be.calledWith(
            {
                where: {
                    projectId: 2,
                    userId: 1,
                    accessRights: {
                        $in: [ "creator"],
                    },
                },
            });
    });
});
