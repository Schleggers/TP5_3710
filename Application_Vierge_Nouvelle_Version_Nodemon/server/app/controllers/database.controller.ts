  import { Router } from "express";
  import { inject, injectable } from "inversify";
  import { DatabaseService } from "../services/database.service";
  import Types from "../types";

  @injectable()
  export class DatabaseController {
    router: Router = Router();
    public constructor(
      // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
      @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
    ) {
      this.handleGetPatients();
      this.handleGetMedecins();
    }


    // public get router(): Router {
    //   const router: Router = Router();
    //   return router;
    // } 

    async handleGetPatients() {
      this.router.get('/patients', async (req, res) => {
        try {
          const result = await this.databaseService.query('SELECT * FROM patients');
          res.json(result.rows);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }  
      });

    }
    
    async handleGetMedecins() {
      this.router.get('/medecins', async (req, res) => {
        try {
          const result = await this.databaseService.query('SELECT * FROM medecins');
          res.json(result.rows);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }  
      });

    }
}
