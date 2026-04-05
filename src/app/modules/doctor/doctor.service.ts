import prisma from '../../../shared/prisma.js';

const createDoctor = async (data: any) => {
  return await prisma.doctor.create({ data });
};

const getAllDoctors = async () => {
  return await prisma.doctor.findMany();
};

export const DoctorService = {
  createDoctor,
  getAllDoctors,
};
