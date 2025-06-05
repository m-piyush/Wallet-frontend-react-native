import { useCallback, useState } from "react";
import { Alert } from "react-native";
export const useTransations = (userId) => {
  const AOI_URL = "https://wallet-backend-react-native.onrender.com/api";
  const [transation, setTransation] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${AOI_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransation(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${AOI_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setTransation(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  // Load data function that fetches both transactions and summary
  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
      const data = await response.json();
      setTransation(data);
    } catch (error) {
      console.error("Error fetching loadData:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async () => {
    try {
      const response = awaitfetch(`${AOI_URL}/transactions/${userId}`, {
        method: "DELETE",
      });

      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message || "Failed to delete transaction");
    }
  };

  return {
    transation,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
