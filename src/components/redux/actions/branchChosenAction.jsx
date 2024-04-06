export const ChangeBranchChosen = (branch_id) => {
  return {
    type: "changeBranchChosen",
    branch_id: branch_id,
  };
};
