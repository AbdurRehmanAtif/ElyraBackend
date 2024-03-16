import { Request, Response, NextFunction } from 'express';
import authController from '../controllers/authControllers';


export default function JWTAuthRoutes(router: any) {

    router.post('/api/v1/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.login(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    router.post('/api/v1/register', async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.register(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    router.post('/api/v1/forgotPassword', async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authController.forgotPassword(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    return router;
}
