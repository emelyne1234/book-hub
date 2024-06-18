import { Router } from "express";
import UserController from "../controllers/user.controller";
import { upload } from "../middlewares/multer.config";
const router = Router();

router.get("/users", UserController.getUsers);
router.post("/users", upload.single("profile"), UserController.registerUser);
router.get("/users/:id", UserController.getUserById);
router.put(
  "/users/:id",
  upload.single("profile"),
  UserController.updateUserInfo
);
router.delete("/users/:id", UserController.deleteUserInfo);

export default router;
