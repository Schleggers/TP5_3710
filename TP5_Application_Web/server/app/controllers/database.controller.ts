import { Router, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) { } 
  public get router(): Router {
    const router: Router = Router();
  
    router.get('/medecins', async (req: Request, res: Response) => {
      try {
        const results = await this.databaseService.getMedecins();
        res.json(results.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });

    router.get('/services', async (req: Request, res: Response) => {
      try {
        const results = await this.databaseService.getServices();
        res.json(results.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });
   
   

    router.post('/medecins', async (req: Request, res: Response) => {
      try {
        const results = await this.databaseService.postMedecins(req.body.idMedecin, req.body.firstName, req.body.lastName, req.body.speciality, req.body.yearOfExperience, req.body.idService);
        res.json(results.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });

   
    router.patch('/medecins', async (req: Request, res: Response) => {
      try {
        const results = await this.databaseService.patchMedecins(req.body.idMedecin, req.body.firstName, req.body.lastName, req.body.speciality, req.body.yearOfExperience, req.body.idService);
        res.json(results.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });

    
    router.delete('/medecins/:id', async (req: Request, res: Response) => {
      try {
        const results = await this.databaseService.deleteMedecins(parseInt(req.params.id));
        res.json(results.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });
  
    return router;
  }
}
