import * as myModel from "../model/mensagensModel.js";

export function getTableName() {
  return myModel.tableName;
}

// GET - Buscar todas as mensagens
export async function Get(req, res) {
  try {
    const response = await myModel.Get();

    return res
      .status(response.message === "Success" ? 200 : 500)
      .json(response);
  } catch (error) {
    return res.status(500).json({
      message: "error",
      Error: error.message,
    });
  }
}

// GET BY ID
export async function GetById(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "error",
        Error: "ID inválido.",
      });
    }

    const response = await myModel.GetById(id);

    return res
      .status(response.message === "Success" ? 200 : 404)
      .json(response);
  } catch (error) {
    return res.status(500).json({
      message: "error",
      Error: error.message,
    });
  }
}

// GET BY GRUPO
export async function GetByGrupo(req, res) {
  try {
    const idgrupo = Number(req.params.idgrupo);
    const iduser = Number(req.query.iduser);

    if (
      !Number.isInteger(idgrupo) ||
      idgrupo <= 0 ||
      !Number.isInteger(iduser) ||
      iduser <= 0
    ) {
      return res.status(400).json({
        message: "error",
        Error: "Grupo ou usuário inválido.",
      });
    }

    // Verificar participação no grupo
    const membership = await myModel.IsUserInGroup(iduser, idgrupo);

    if (membership.message !== "Success") {
      return res.status(500).json(membership);
    }

    if (!membership.authorized) {
      return res.status(403).json({
        message: "error",
        Error: "Você não pertence a este grupo.",
      });
    }

    const response = await myModel.GetByGrupo(idgrupo);

    return res
      .status(response.message === "Success" ? 200 : 500)
      .json(response);
  } catch (error) {
    return res.status(500).json({
      message: "error",
      Error: error.message,
    });
  }
}

// POST - Criar mensagem
export async function Post(req, res) {
  try {
    const { iduser, idgrupo, message } = req.body || {};

    const userId = Number(iduser);
    const groupId = Number(idgrupo);

    if (
      !Number.isInteger(userId) ||
      userId <= 0 ||
      !Number.isInteger(groupId) ||
      groupId <= 0 ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        message: "error",
        Error: "Informe usuário, grupo e mensagem.",
      });
    }

    const mensagem = message.trim();

    if (mensagem.length > 500) {
      return res.status(400).json({
        message: "error",
        Error: "A mensagem deve ter no máximo 500 caracteres.",
      });
    }

    // Verificar se o usuário pertence ao grupo
    const membership = await myModel.IsUserInGroup(userId, groupId);

    if (membership.message !== "Success") {
      return res.status(500).json(membership);
    }

    if (!membership.authorized) {
      return res.status(403).json({
        message: "error",
        Error: "Você não pertence a este grupo.",
      });
    }

    const response = await myModel.CreateMessage({
      iduser: userId,
      idgrupo: groupId,
      message: mensagem,
    });

    return res
      .status(response.message === "Success" ? 201 : 500)
      .json(response);
  } catch (error) {
    return res.status(500).json({
      message: "error",
      Error: error.message,
    });
  }
}

// DELETE
export async function Delete(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "error",
        Error: "ID inválido.",
      });
    }

    const response = await myModel.Delete(id);

    return res
      .status(response.message === "Success" ? 200 : 404)
      .json(response);
  } catch (error) {
    return res.status(500).json({
      message: "error",
      Error: error.message,
    });
  }
}
