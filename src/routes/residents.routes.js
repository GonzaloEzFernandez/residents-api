import { Router } from "express";
import {
  getResidents,
  getResident,
  createResident,
  updateResident,
  deleteResident,
} from "../controllers/residents.controller.js";

const route = Router();

route.get("/residents", getResidents);

route.get("/residents/:id", getResident);

route.post("/residents", createResident);

route.patch("/residents/:id", updateResident);

route.delete("/residents/:id", deleteResident);

export default route;
