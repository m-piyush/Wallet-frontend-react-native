import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,

} from "react-native";
import { SignOutButton } from "../../components/SignOutButton";
import { useTransations } from "../../hooks/useTransations";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/style/home.styles";
import Iconicon from "react-native-vector-icons/Ionicons";
import TransactionItem from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";
import BalanceCard from "../../components/BalanceCard";
import { useRouter } from "expo-router";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { transations, summary, isLoading, loadData, deleteTransaction } =
    useTransations(user?.id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }
  useEffect(() => {
    loadData();
  }, [loadData]);
  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* left */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>
              {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
            </Text>
          </View>

          {/* Right */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Iconicon name="add" size={20} color="#fff" />
              {/* <Text style={styles.addButtonText}>Add</Text> */}
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transations}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}
