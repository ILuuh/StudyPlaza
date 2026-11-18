import { db } from "../databases/DatabaseContext.js";

export const tableName = "mensagens";

// Verificar se o usuário pertence ao grupo
export async function IsUserInGroup(iduser, idgrupo) {
  try {
    const [results] = await db.execute(
      `SELECT id
       FROM usuariosgrupos
       WHERE iduser = ?
       AND idgrupo = ?
       AND actived = 1
       LIMIT 1`,
      [iduser, idgrupo],
    );

    return {
      message: "Success",
      authorized: results.length > 0,
    };
  } catch (error) {
    return {
      message: "error",
      Error: error.message,
    };
  }
}

// Buscar todas as mensagens
export async function Get() {
  try {
    const [results] = await db.execute(
      `SELECT
        m.id,
        m.iduser,
        u.name AS username,
        m.idgrupo,
        m.message,
        m.created_at
       FROM mensagens m
       INNER JOIN users u ON u.id = m.iduser
       ORDER BY m.created_at ASC, m.id ASC`,
    );

    return {
      message: "Success",
      data: results,
    };
  } catch (error) {
    return {
      message: "error",
      Error: error.message,
    };
  }
}

// Buscar mensagem por ID
export async function GetById(id) {
  try {
    const [results] = await db.execute(
      `SELECT
        m.id,
        m.iduser,
        u.name AS username,
        m.idgrupo,
        m.message,
        m.created_at
       FROM mensagens m
       INNER JOIN users u ON u.id = m.iduser
       WHERE m.id = ?`,
      [id],
    );

    if (results.length === 0) {
      return {
        message: "error",
        Error: "Mensagem não encontrada.",
      };
    }

    return {
      message: "Success",
      data: results[0],
    };
  } catch (error) {
    return {
      message: "error",
      Error: error.message,
    };
  }
}

// Buscar histórico de um grupo
export async function GetByGrupo(idgrupo) {
  try {
    const [results] = await db.execute(
      `SELECT
        m.id,
        m.iduser,
        u.name AS username,
        m.idgrupo,
        m.message,
        m.created_at
       FROM mensagens m
       INNER JOIN users u ON u.id = m.iduser
       WHERE m.idgrupo = ?
       ORDER BY m.created_at ASC, m.id ASC`,
      [idgrupo],
    );

    return {
      message: "Success",
      data: results,
    };
  } catch (error) {
    return {
      message: "error",
      Error: error.message,
    };
  }
}

// Criar mensagem
export async function CreateMessage(data) {
  try {
    const { iduser, idgrupo, message } = data;

    const [result] = await db.execute(
      `INSERT INTO mensagens
       (iduser, idgrupo, message)
       VALUES (?, ?, ?)`,
      [iduser, idgrupo, message],
    );

    return {
      message: "Success",
      data: {
        id: result.insertId,
      },
    };
  } catch (error) {
    return {
      message: "error",
      Error: error.message,
    };
  }
}

// Deletar mensagem
export async function Delete(id) {
  try {
    const [result] = await db.execute(`DELETE FROM mensagens WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return {
        message: "error",
        Error: "Mensagem não encontrada.",
      };
    }

    return {
      message: "Success",
      data: result,
    };
  } catch (error) {
    return {
      message: "error",
      Error: error.message,
    };
  }
}
