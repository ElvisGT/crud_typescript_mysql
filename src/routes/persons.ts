import { Router, Request, Response } from "express";
import Mysql from "../mysql/mysql";


const router = Router();

router.get("/people", (req: Request, res: Response) => {
  const query = `
    SELECT * 
    FROM heroes
  `;

  Mysql.runQuery(query, (err: Error, heroes: Object[]) => {

    if (err) {
      return res.status(400).json({
        err
      })
    }

    res.json({
      resulst:heroes
    })
  })


})

router.get("/people/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const escapedId = Mysql.escapeQuery(id);

  const query = `
    SELECT * 
    FROM heroes
    WHERE id=${escapedId}
  `;

  Mysql.runQuery(query, (err: Error, heroe: Object[]) => {

    if (err) {
      return res.status(400).json({
        err
      })
    }

    if(heroe.length === 0){
      return res.json({
        msg:"El registro solicitado no existe"
      })
    }

    res.json({
      resulst:heroe[0]
    })
  })


})


export default router;