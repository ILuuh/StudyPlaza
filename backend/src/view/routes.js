import { Router } from "express";
import userRoutes from "./usersRoutes.js";
import authRoutes from "./authRoutes.js"
import rolesRoutes from "./rolesRoutes.js";
import usersRoles from "./usersRolesRoutes.js";
import cursosRoutes from "./cursosRoutes.js";
import inscricoesRoutes from "./inscricoesRoutes.js";
import gruposRoutes from "./gruposRoutes.js";
import usuariosGruposRoutes from "./usuariosGruposRoutes.js";

const swRoutes = Router();

swRoutes.use(userRoutes);
swRoutes.use( authRoutes) ;

swRoutes.use( rolesRoutes);
swRoutes.use( usersRoles);
swRoutes.use( cursosRoutes);
swRoutes.use( usuariosGruposRoutes);
swRoutes.use( gruposRoutes);
swRoutes.use( inscricoesRoutes);

export default swRoutes;