"use strict";

import {expect, use}  from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {db} from "../../../src/sqldb";
const User = db.User;
use(chaiAsPromised);
let user;
const genUser = function() {
  user = User.build({
    provider: "local",
    name: "Fake User",
    email: "test@example.com",
    password: "password",
  });
  return user;
};

describe("User Model", function() {
  before(function() {
    // Sync and clear users before testing
    return User.sync().then(function() {
      return User.destroy({ where: {} });
    });
  });

  beforeEach(function() {
    genUser();
  });

  afterEach(function() {
    return User.destroy({ where: {} });
  });

  it("should begin with no users", function() {
    return expect(User.findAll()).to
        .eventually.have.length(0);
  });

  it("should fail when saving a duplicate user", function() {
    return expect(user.save()
        .then(function() {
          let userDup = genUser();
          return userDup.save();
        })).to.be.rejected;
  });

  describe("#email", function() {
    it("should fail when saving without an email", function() {
      user.email = "";
      return expect(user.save()).to.be.rejected;
    });
  });

  describe("#password", function() {
    beforeEach(function() {
      return user.save();
    });

    it("should authenticate user if valid", function() {
     return  expect(user.authenticate("password")).to.eventually.true;
    });

    it("should not authenticate user if invalid", function() {
     return expect(user.authenticate("blah")).to.eventually.false;
    });

    it("should remain the same hash unless the password is updated", function() {
      user.name = "Test User";
      return expect(user.save()
          .then(function(u) {
            return u.authenticate("password");
          })).to.eventually.be.true;
    });
  });
});
