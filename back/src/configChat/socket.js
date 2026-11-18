import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import {
  IsUserInGroup,
  GetByGrupo,
  GetById,
  CreateMessage,
} from "../model/mensagensModel.js";

const ID_GRUPO_GERAL = 1;
const SALA_GRUPO_GERAL = `grupo:${ID_GRUPO_GERAL}`;

export function configureSocket(io) {
  // Autenticação da conexão pelo JWT do Study Plaza
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Token não informado."));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "chave_secreta_temporaria",
      );

      if (!decoded.userId) {
        return next(new Error("Token inválido."));
      }

      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error("Sessão inválida ou expirada."));
    }
  });

  io.on("connection", async (socket) => {
    const iduser = socket.user.userId;

    try {
      // Verifica se o usuário participa do grupo geral
      const membership = await IsUserInGroup(iduser, ID_GRUPO_GERAL);

      if (!membership.authorized) {
        socket.emit("chat:error", {
          message: "Você não participa do grupo geral.",
        });

        socket.disconnect();
        return;
      }

      // Conecta o usuário à sala
      socket.join(SALA_GRUPO_GERAL);

      // Carrega o histórico de mensagens
      const history = await GetByGrupo(ID_GRUPO_GERAL);

      socket.emit("chat:history", history.data || []);

      // Recebe uma nova mensagem
      socket.on("chat:send", async (data) => {
        try {
          const message = String(data?.message || "").trim();

          if (!message) return;

          if (message.length > 500) {
            socket.emit("chat:error", {
              message: "A mensagem deve ter no máximo 500 caracteres.",
            });
            return;
          }

          // O usuário vem do JWT, nunca do navegador
          const result = await CreateMessage({
            iduser,
            idgrupo: ID_GRUPO_GERAL,
            message,
          });

          // Busca a mensagem salva no banco
          const saved = await GetById(result.data.id);

          const messageData = Array.isArray(saved.data)
            ? saved.data[0]
            : saved.data;

          // Envia para todos os participantes da sala
          io.to(SALA_GRUPO_GERAL).emit("chat:message", messageData);
        } catch (error) {
          console.error("Erro ao enviar mensagem:", error);

          socket.emit("chat:error", {
            message: "Não foi possível enviar a mensagem.",
          });
        }
      });

      socket.on("disconnect", () => {
        console.log(`Usuário ${iduser} desconectado do chat.`);
      });

      console.log(`Usuário ${iduser} conectado ao grupo geral.`);
    } catch (error) {
      console.error("Erro na conexão do chat:", error);

      socket.emit("chat:error", {
        message: "Erro ao conectar ao grupo geral.",
      });

      socket.disconnect();
    }
  });
}
