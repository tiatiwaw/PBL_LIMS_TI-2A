import { useCallback } from "react";

export function useUserActions({
    createUser,
    updateUser,
    deleteUser,
    formState,
}) {
    const handleCreate = useCallback(
        async (formData) => {
            const dataToSave = {
                ...formData,
                trainings: formState.trainings.confirmed,
            };

            await createUser.mutateAsync(dataToSave);

            formState.trainings.initialize([]);
        },
        [formState, createUser]
    );

    const handleEdit = useCallback(
        async (id, formData) => {
            const dataToSave = {
                ...formData,
                trainings: formState.trainings.confirmed,
            };

            if (dataToSave.role === "analyst") {
                dataToSave.trainings = formState.trainings.confirmed;
            } else {
                dataToSave.trainings = [];
                dataToSave.specialist = "";
            }

            await updateUser.mutateAsync({ id, data: dataToSave });

            formState.trainings.initialize([]);
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
