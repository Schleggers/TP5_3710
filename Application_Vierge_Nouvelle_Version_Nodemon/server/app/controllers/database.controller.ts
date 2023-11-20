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
   

    router.post('/medecins', async (req: Request, res: Response) => {
      try {
        console.log("post");
        console.log(req.body);
        const results = await this.databaseService.postMedecins(req.body.idMedecin, req.body.prenom, req.body.nom, req.body.specialite, req.body.anneesExperience, req.body.idService);
        res.json(results.rows[0]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }  
    });

   
    router.patch('/medecins/:id', async (req: Request, res: Response) => {
      try {
        console.log(req.body);
        const results = await this.databaseService.patchMedecins(parseInt(req.params.id), req.body.prenom, req.body.nom, req.body.specialite, req.body.anneesExperience, req.body.idService);
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
