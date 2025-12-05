import { useQuery } from "@tanstack/react-query";

export const useGetById = (service, key, id) => {
    const query = useQuery({
        queryKey: [key, id],
        enabled: !!id,
        queryFn: () => service.getById(id),
        staleTime: 5 * 60 * 1000, // 5 menit
        refetchOnMount: "stale",
        refetchOnWindowFocus: "stale",
    });

    // Return combined loading state that includes refetching
    return {
        ...query,
        isLoading: query.isLoading || query.isRefetching,
    };
};
