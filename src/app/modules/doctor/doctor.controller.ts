import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { DoctorService } from './doctor.service.js';
import { createDoctorSchema } from './doctor.schema.js';

const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createDoctorSchema.parse(req.body);
    const result = await DoctorService.createDoctor(parsed);
    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Doctor created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DoctorService.getAllDoctors();
    res.status(httpStatus.OK).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const DoctorController = {
  createDoctor,
  getAllDoctors,
};