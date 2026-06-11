import { Router, Request, Response } from "express";
import pool from "./database";
import bcrypt from "bcrypt";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, senha } = req.body;

      const [rows]: any = await pool.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );

      if (rows.length === 0) {
        return res.status(401).json({
          sucesso: false,
          mensagem: "Usuário não encontrado",
        });
      }

      const usuario = rows[0];

      const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          sucesso: false,
          mensagem: "Senha inválida"
        });
      }

      return res.json({
        sucesso: true,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario,
        },
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro no servidor",
      });
    }
  }
);

router.get("/cursos", async (req, res) => {
  const [rows]: any = await pool.query(
    "SELECT * FROM cursos"
  );

  res.json(rows);
});

router.get(
  "/usuarios/:id",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;

      const [rows]: any = await pool.query(
        `
        SELECT
          id,
          nome,
          email,
          tipo_usuario
        FROM usuarios
        WHERE id = ?
        `,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).json({
          mensagem: "Usuário não encontrado",
        });
      }

      return res.json(rows[0]);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        mensagem: "Erro ao buscar usuário",
      });
    }
  }
);

router.post(
  "/inscricoes",
  async (req: Request, res: Response): Promise<any> => {
    try {

      const {
        id_usuario,
        id_curso
      } = req.body;

      await pool.query(
        `
        INSERT INTO inscricoes
        (
          id_usuario,
          id_curso
        )
        VALUES (?, ?)
        `,
        [
          id_usuario,
          id_curso
        ]
      );

      return res.json({
        sucesso: true,
        mensagem: "Inscrição realizada com sucesso"
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao realizar inscrição"
      });

    }
  }
);

router.get(
  "/meusCursos/:id_usuario",
  async (req: Request, res: Response): Promise<any> => {
    try {

      const { id_usuario } = req.params;

      const [rows]: any = await pool.query(
        `
        SELECT
          i.id as id_inscricao,
          c.id,
          c.titulo,
          c.descricao,
          c.plataforma,
          c.modalidade,
          c.duracao_semestres
        FROM inscricoes i
        INNER JOIN cursos c
          ON c.id = i.id_curso
        WHERE i.id_usuario = ?
        `,
        [id_usuario]
      );

      return res.json(rows);

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        mensagem: "Erro ao buscar cursos"
      });

    }
  }
);

router.delete(
  "/inscricoes/:id",
  async (req: Request, res: Response): Promise<any> => {

    try {

      const { id } = req.params;

      await pool.query(
        `
        DELETE FROM inscricoes
        WHERE id = ?
        `,
        [id]
      );

      return res.json({
        sucesso: true
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        sucesso: false
      });

    }

  }
);

router.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {

    try {

      const {
        nome,
        email,
        senha,
        tipo_usuario
      } = req.body;

      const [usuarioExistente]: any =
        await pool.query(
          "SELECT id FROM usuarios WHERE email = ?",
          [email]
        );

      if (usuarioExistente.length > 0) {

        return res.status(400).json({
          sucesso: false,
          mensagem: "E-mail já cadastrado"
        });

      }
      const senhaHash = await bcrypt.hash(senha, 10);
      await pool.query(
        `
        INSERT INTO usuarios
        (
          nome,
          email,
          senha,
          tipo_usuario
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          nome,
          email,
          senhaHash,
          tipo_usuario
        ]
      );

      return res.json({
        sucesso: true,
        mensagem: "Usuário cadastrado com sucesso"
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Erro ao cadastrar usuário"
      });

    }

  }
);

export default router;