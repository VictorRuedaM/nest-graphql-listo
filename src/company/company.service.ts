import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyInput } from './dto/createCompany.dto';
import { UpdateCompanyInput } from './dto/updateCompany.dto';


@Injectable()
export class CompanyService {

  constructor(@InjectModel('Company') private readonly companyModel: Model<Company>){}

  async findAll(): Promise<Company[]>{
    const companies = await this.companyModel.find();
    if(!companies || companies.length < 1) throw new NotFoundException(`Companies Not Found In DataBase`)
    return companies;
  }

  async findOne(_id: string): Promise<Company>{
    const company = await this.companyModel.findById(_id);
    if(!company) throw new NotFoundException(`Company With Id: ${_id} Not Found`)
    return company;
  }

  async create(comapyDto: CreateCompanyInput): Promise<Company>{
    const newCompany = await this.companyModel.create(comapyDto);
    newCompany.save();
    return newCompany;
  }


  async update(_id: string, updateCompanyInput: UpdateCompanyInput): Promise<Company>{
    await this.findOne(_id);
    const companyUpdated = await this.companyModel.findByIdAndUpdate(_id, updateCompanyInput, {new: true});
   
    return companyUpdated;
  }

  async delete(_id: string): Promise<Company>{
    await this.findOne(_id);
    const companyDelete = await this.companyModel.findByIdAndDelete(_id);
    
    return companyDelete;
  }
}
