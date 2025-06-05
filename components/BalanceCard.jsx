import { View, Text } from "react-native";
import { styles } from "../assets/style/home.styles";
import { COLORS } from "../constants/Colors";

const BalanceCard = ({ summary }) => {
  const total = parseFloat(summary.balance) || 0;
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={total > 0 ? styles.balanceStatAmountpostive : styles.balanceStatAmountNegative}>

        ${parseFloat(summary.balance).toFixed(2)}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income:</Text>
          <Text style={[styles.balanceAmount, { color: COLORS.income }]}>
            ${parseFloat(summary.income).toFixed(2)}
          </Text>
        </View>

        <View style={[styles.balanceStatItem, styles.statDivider]}>
          <Text style={styles.balanceStatLabel}>Expenses:</Text>
          <Text style={[styles.balanceAmount, { color: COLORS.expense }]}>
            -${Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};


export default BalanceCard;