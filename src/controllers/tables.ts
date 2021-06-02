import { RequestHandler } from 'express';

export const getSpecificTable: RequestHandler = (req, res, next) => {
    const userId = req.body.userId;
    const tableId = req.params.tableId;

    return res.status(200).json({});
}

export const postTableResult: RequestHandler = (req, res, next) => {
    const userId = req.body.userId;
    const professionResult = req.body.professionResult;
}