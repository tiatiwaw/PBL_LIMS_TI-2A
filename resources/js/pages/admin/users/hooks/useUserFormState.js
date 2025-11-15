import { useEntitySelection } from "./useEntitySelection";

export function useUserFormState() {
    const trainings = useEntitySelection();
    const certificates = useEntitySelection();

    return {
        trainings,
        certificates,
    };
}
