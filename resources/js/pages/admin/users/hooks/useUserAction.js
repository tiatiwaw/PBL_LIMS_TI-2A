import { useCallback } from "react";

export function useUserActions({ createUser, updateUser, deleteUser, formState }) {
  const handleCreate = useCallback(
    async (formData) => {
      const dataToSave = {
        ...formData,
        trainings: formState.trainings.confirmed,
        certificates: formState.certificates.confirmed,
      };

      console.log("Creating user with:", dataToSave);
      // await createUser.mutateAsync(dataToSave);

      formState.trainings.initialize([]);
      formState.certificates.initialize([]);
    },
    [formState, createUser]
  );

  const handleEdit = useCallback(
    async (id, formData) => {
      const dataToSave = {
        ...formData,
        trainings: formState.trainings.confirmed,
        certificates: formState.certificates.confirmed,
      };

      await updateUser.mutateAsync({ id, data: dataToSave });

      formState.trainings.initialize([]);
      formState.certificates.initialize([]);
    },
    [formState, updateUser]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteUser.mutateAsync(id);
    },
    [deleteUser]
  );

  return {
    handleCreate,
    handleEdit,
    handleDelete,
  };
}