/**
 * Created by sasha on 6/22/17.
 */



"use strict";

import {Router} from "express";
import {hasProjectRoles, hasRole, isAuthenticated} from "../../auth/auth.service";
import {iconParse, projectUpload} from "../../config/multer.config";
import {controller} from "./project.controller";
import {validateReauest} from "../../common/validation.service";
// import {validateReauest} from "../../common/validation.service";

export default function(): Router {
    const router =  Router();
    router.get("/", isAuthenticated(), controller.show);
    router.get("/latest", isAuthenticated(), controller.latest);
    router.get("/:projectId/boards", hasProjectRoles(),  controller.getBoards);
    router.get("/:projectId/users", hasProjectRoles(),  controller.getUsers);

    router.delete("/:id", hasProjectRoles(["admin", "creator"]), controller.destroy);
    router.put("/:projectId", hasProjectRoles(["admin", "creator"]), iconParse("icon"), controller.update);
    router.post("/", isAuthenticated(), iconParse("icon"), validateReauest(controller.createValidator), controller.create);
    return router;
}
