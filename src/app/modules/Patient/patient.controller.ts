import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { patientFilterableFields } from './patient.constants';
import { PatientServices } from './patient.services';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PatientServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params;
  const result = await PatientServices.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieval successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
const {id} = req.params
const result = await PatientServices.updateIntoDB(id,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient updated successfully',
    data: result,
  });
});






export const PatientController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,

};