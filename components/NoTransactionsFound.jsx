import { Iconicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../assets/style/home.styles";
import { COLORS } from "../constants/Colors";
import { useRouter } from "expo-router";

const NoTransactionsFound = () => {
  const router = useRouter();

  return (
    <View syle={styles.emptyState}>
      <Iconicons
        name="recei[pt-outline"
        size={60}
        color={COLORS.textLight}
        style={styles.emptyStateText}
      />
      <Text style={styles.emptyStateText}> No Transactions yet</Text>
      <Text style={styles.emptyStateSubText}>
        start tracking yout finances by adding your first transaction
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/create")}
      >
        <iconicons name="add-circle" size={20} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};
