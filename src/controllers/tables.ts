import { RequestHandler } from 'express';

export const postTableResult: RequestHandler = (req, res, next) => {
    const userId = req.body.userId;
    const professionResult = req.body.professionResult;


}

export const getTableResultsByUser: RequestHandler = (req, res, next) => {
    const userId = req.body.userId;
}

export const getSpecificTableFromUser: RequestHandler = (req, res, next) => {
    const userId = req.body.userId;
    const tableId = req.params.tableId;

    return res.status(200).json({});
}