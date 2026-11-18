import { Router } from "express";
import * as mycontroller from "../controller/mensagensController.js";

const router = Router();

const endPoint = `/${mycontroller.getTableName()}`;

// Histórico de mensagens de um grupo
router.get(`${endPoint}/grupo/:idgrupo`, mycontroller.GetByGrupo);

// Buscar todas as mensagens
router.get(endPoint, mycontroller.Get);

// Buscar mensagem por ID
router.get(`${endPoint}/:id`, mycontroller.GetById);

// Criar mensagem
router.post(endPoint, mycontroller.Post);

// Excluir mensagem
router.delete(`${endPoint}/:id`, mycontroller.Delete);

export default router;
