import type { UserRoleEnum, MortalityStatusEnum } from "@prisma/client";

export interface IUserBasicInfo {
  id: string;
  names: string;
  email: string;
  role: UserRoleEnum;
}

export interface IHospitalResponse {
  id: string;
  user: {
    id: string;
    names: string;
    email: string;
    location: string;
  };
}
export interface IMortalityResponse {
  id: string;
  nid: string;
  firstName: string;
  lastName: string;
  location: string;
  dob: Date;
  diedOn: Date;
  registeredOn?: Date;
  status: MortalityStatusEnum;
  hospital: {
    id: string;
    names: string;
    email: string;
    location: string;
  };
  claim?: {
    id: string;
    amount: number;
    method: string;
    paidAt: Date;
    pickUpDate: Date;
    relationship: string;
    relative: {
      id: string;
      names: string;
      email: string;
      location: string;
      nid: string;
      tel: string;
    };
  };
}

export interface IRelativeResponse {
  id: string;
  nid: string;
  tel: string;
  user: {
    id: string;
    names: string;
    email: string;
    location: string;
  };
}

// DATABASE STRUCTURE

export interface IHospital {
  id: string;
  user: IUser;
  mortality: IMortality[];
}

export interface IMortality {
  id: string;
  nid: string;
  firstName: string;
  lastName: string;
  location: string;
  dob: Date;
  diedOn: Date;
  registeredOn?: Date;
  status: MortalityStatusEnum;
  hospital: IHospital;
  claim?: IClaim;
}

export interface IRelative {
  id: string;
  nid: string;
  tel: string;
  user: IUser;
  claim?: IClaim[];
}

export interface IClaim {
  id: string;
  amount: number;
  method: string;
  paidAt: Date;
  pickUpDate: Date;
  relationship: string;
  relative: IRelative;
  mortality: IMortality;
}

export interface IUser {
  id: string;
  names: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  location: string;
  hospital?: IHospital;
  relative?: IRelative;
}
