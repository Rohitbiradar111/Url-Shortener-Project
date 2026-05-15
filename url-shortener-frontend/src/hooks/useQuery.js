import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import dayjs from "dayjs";

export const useFetchMyShortUrls = (token) => {
  return useQuery({
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      const response = await api.get("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    },
    select: (data) => {
      return [...data].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
      );
    },
    staleTime: 5000,
  });
};

export const useFetchTotalClicks = (token) => {
  const startDate = "2024-01-01";
  const endDate = dayjs().format("YYYY-12-31");

  return useQuery({
    queryKey: ["url-totalclick"],
    queryFn: async () => {
      const response = await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
      return response.data;
    },
    select: (data) => {
      return Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      }));
    },
    staleTime: 5000,
  });
};
