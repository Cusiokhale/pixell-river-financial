import { Request, Response } from 'express';
import * as branchService from '../services/branches';

export const createBranch = (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    
    // Validate required fields
    if (!name || !address || !phone) {
      return res.status(400).json({
        error: 'All fields are required: name, address, phone'
      });
    }

    const newBranch = branchService.createBranch(req.body);
    res.status(201).json(newBranch);
  } catch (error) {
    if (error instanceof Error && error.message === 'Branch with this name already exists') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllBranches = (_req: Request, res: Response) => {
  try {
    const branches = branchService.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBranchById = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid branch ID' });
    }

    const branch = branchService.getBranchById(id);
    
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBranch = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid branch ID' });
    }

    const updatedBranch = branchService.updateBranch(id, req.body);
    
    if (!updatedBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json(updatedBranch);
  } catch (error) {
    if (error instanceof Error && error.message === 'Branch with this name already exists') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBranch = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid branch ID' });
    }

    const isDeleted = branchService.deleteBranch(id);
    
    if (!isDeleted) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.status(200).json({ message: 'Branch successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};