import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Alert } from 'react-native';
import { AOI_URL } from "../../constants/api";
import { styles } from "../../assets/style/create.style";
import { COLORS } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CATEGORIES = [
    { id: "food", name: "Food & Drinks", icon: "fast-food" },
    { id: "shopping", name: "Shopping", icon: "cart" },
    { id: "transportation", name: "Transportation", icon: "car" },
    { id: "entertainment", name: "Entertainment", icon: "film" },
    { id: "bills", name: "Bills", icon: "receipt" },
    { id: "income", name: "Income", icon: "cash" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal" },
]
const CreateScreen = () => {
    const router = useRouter()
    const { user } = useUser()
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [selectedCategory, setSelectedCategory] = useState("")
    const [isExpense, setIsExpense] = useState(true)
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
 
        if (!title.trim()) return Alert.alert("Error", "Please enter a Transaction title.")

        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            Alert.alert("Error", "Please enter a valid amount.");
            return;
        }
        if (!selectedCategory) return Alert.alert("Error", "Please select a category.")

        setIsLoading(true);
        try {
            const formattedAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

            const response = await fetch(`${AOI_URL}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    title,
                    amount: formattedAmount,
                    category: selectedCategory
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create transaction");
            }
            Alert.alert("Success", "Transaction created successfully");
            router.back();
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to  created transaction");
            console.error("Error in Creating transaction :", error);
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Transaction</Text>
                <TouchableOpacity style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]} onPress={handleCreate} disabled={isLoading}>
                    <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
                    {!isLoading && <Ionicons name="checkmark" size={24} color={COLORS.text} />}
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.card}>
                <View style={styles.typeSelector}>
                    {/* Expense Selector */}
                    <TouchableOpacity style={[styles.typeButton, isExpense && styles.typeButtonActive]} onPress={() => setIsExpense(true)}>
                        <Ionicons name="arrow-down-circle" size={22} color={isExpense ? COLORS.white : COLORS.expense} />
                        <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>Expense</Text>
                    </TouchableOpacity>


                    {/* Income  Selector*/}

                    <TouchableOpacity style={[styles.typeButton, !isExpense && styles.typeButtonActive]} onPress={() => setIsExpense(false)}>
                        <Ionicons name="arrow-down-circle" size={22} color={isExpense ? COLORS.white : COLORS.expense} />
                        <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>Income</Text>
                    </TouchableOpacity>
                </View>

                {/* AMount */}

                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        placeholderTextColor={COLORS.textLight}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                </View>

                {/* input Amount */}
                <View style={styles.inputContainer}>
                    <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder='Transaction Title'
                        placeholderTextColor={COLORS.textLight}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.categoryGrid}>
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity key={category.id} style={[styles.categoryButton, selectedCategory === category.name && styles.categoryButtonActive]} onPress={() => setSelectedCategory(category.name)}>
                            <Ionicons name={category.icon} size={20} color={selectedCategory === category.name ? COLORS.white : COLORS.text} />
                            <Text style={[styles.categoryButtonText, selectedCategory === category.name && styles.categoryButtonTextActive]}>{category.name}</Text>

                        </TouchableOpacity>))}
                </View>
            </View>


            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}
        </View>
    )

}
export default CreateScreen