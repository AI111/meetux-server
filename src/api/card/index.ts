"use strict";

import {Router} from "express";
import {hasBoardRoles, hasProjectRoles, isAuthenticated} from "../../auth/auth.service";
import {validateReauest} from "../../common/validation.service";
import {controller} from "./card.controller";

export default function(): Router {
    const router =  Router();
    // router.get("/:boardId/columns", hasBoardRoles(),  controller.index);
    // router.delete("/:id", hasRole("admin"), controller.destroy);
    // router.get("/me", hasProjectRoles(), controller.show);
    router.put("/:columnId", isAuthenticated(), validateReauest(controller.updateValidator), controller.patch);
    // router.get("/boards/:id", hasBoardRoles(), controller.show);
    router.post("/" , hasBoardRoles(), validateReauest(controller.createValidator), controller.create);
    return router;
}