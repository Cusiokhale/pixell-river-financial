import { branches, Branch, CreateBranchRequest, UpdateBranchRequest } from '../../../data/branches';

const getNextId = () => {
    return branches.length + 1;
}

export const createBranch = (branchData: CreateBranchRequest): Branch => {
    // Check if branch name already exists
    const existingBranch = branches.find(branch =>
        branch.name.toLowerCase() === branchData.name.toLowerCase()
    );
    if (existingBranch) {
        throw new Error('Branch with this name already exists');
    }

    const newBranch: Branch = {
        id: getNextId(),
        ...branchData
    };

    branches.push(newBranch);
    return newBranch;
};

export const getAllBranches = (): Branch[] => {
    return branches;
};

export const getBranchById = (id: number): Branch | null => {
    return branches.find(branch => branch.id === id) || null;
};

export const updateBranch = (id: number, updateData: UpdateBranchRequest) => {
    const branchIndex = branches.findIndex(branch => branch.id === id);

    if (branchIndex === -1) {
        return null;
    }

    // Check if name is being updated and already exists for another branch
    if (updateData.name) {
        const existingBranch = branches.find(branch =>
            branch.name.toLowerCase() === updateData.name!.toLowerCase() && branch.id !== id
        );
        if (existingBranch) {
            throw new Error('Branch with this name already exists');
        }
    }

    // Update only provided fields

    const updatedBranch: Branch = { ...branches[branchIndex] };

    for (const key in updateData) {
        if (updateData[key as keyof UpdateBranchRequest] !== undefined) {
            updatedBranch[key as keyof Branch] = updateData[key as keyof UpdateBranchRequest]!;
        }

        branches[branchIndex] = updatedBranch;

        return updatedBranch;
    };
}

    export const deleteBranch = (id: number): boolean => {
        const branchIndex = branches.findIndex(branch => branch.id === id);

        if (branchIndex === -1) {
            return false;
        }

        branches.splice(branchIndex, 1);
        return true;
    };