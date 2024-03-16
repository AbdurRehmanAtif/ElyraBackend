import { Request, Response, NextFunction } from 'express';

interface User {
    // Define the properties of the User interface, including 'admin'
    username: string;
    email: string;
    admin: boolean; // Assuming 'admin' is a boolean property
    // Add other properties if needed
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            mgs: 'You are not authorized to view this page'
        });
    }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    // Assuming req.user is of type User
    if (req.isAuthenticated() && (req.user as User).admin) {
        next();
    } else {
        res.status(401).json({
            msg: 'You are not authorized to view this page'
        });
    }
}