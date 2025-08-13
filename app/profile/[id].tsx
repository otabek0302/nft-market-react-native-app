import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { useAccount } from "@/context/account-context";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileTab() {
  const { theme } = useThemeSwitcher();
  const { account, clearAccount } = useAccount();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.card,
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    scrollView: {
      flex: 1,
    },
    profileHeader: {
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    profileImageContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.card,
      borderWidth: 3,
      borderColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      overflow: "hidden",
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    defaultProfileIcon: {
      fontSize: 48,
      color: theme.colors.primary,
    },
    username: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text,
      marginBottom: 8,
    },
    bio: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: "center",
      opacity: 0.8,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      paddingVertical: 16,
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      marginTop: 4,
    },
    infoSection: {
      padding: 20,
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    infoLabel: {
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.7,
    },
    infoValue: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: "500",
      maxWidth: "60%",
      textAlign: "right",
    },
    addressContainer: {
      backgroundColor: theme.colors.card,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    addressText: {
      fontSize: 14,
      color: theme.colors.text,
      fontFamily: "monospace",
    },
    emptyState: {
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.5,
      fontStyle: "italic",
    },
    logOutSection: {
      padding: 20,
    },
    logOutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      backgroundColor: theme.colors.error,
    },
    logOutText: {
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 8,
    },
  });

  if (!account) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text variant="subtitle" style={{ color: theme.colors.text }}>
            No account data available
          </Text>
          <Text variant="body" style={{ color: theme.colors.text, opacity: 0.7, marginTop: 8 }}>
            Please go back and search for an account
          </Text>
        </View>
      </View>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString || dateString === "1970-01-01") return "Recently joined";
    return new Date(dateString)?.toLocaleDateString();
  };

  const shortenAddress = (address: string) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const handleLogOut = () => {
    clearAccount();
    router.push("/");
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/collections")}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>@{account.username || "Profile"}</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>{account?.profile_image_url ? <Image source={{ uri: account.profile_image_url }} style={styles.profileImage} /> : <Text style={styles.defaultProfileIcon}>👤</Text>}</View>

          <Text style={styles.username}>@{account?.username || "Unknown"}</Text>

          {account?.bio ? <Text style={styles.bio}>{account.bio}</Text> : <Text style={styles.bio}>No bio available</Text>}

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>NFTs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Collections</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.infoSection}>
          <Text variant="title" style={{ marginBottom: 16, color: theme.colors.text }}>
            Account Information
          </Text>

          <View style={styles?.infoItem}>
            <Text style={styles?.infoLabel}>Wallet Address</Text>
            <View style={styles?.addressContainer}>
              <Text style={styles?.addressText}>{shortenAddress(account.address)}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles?.infoValue}>{formatDate(account.joined_date)}</Text>
          </View>

          {account.website && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles?.infoValue}>{account.website}</Text>
            </View>
          )}

          {account.social_media_accounts && account.social_media_accounts.length > 0 ? (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Social Media</Text>
              <Text style={styles?.infoValue}>{account.social_media_accounts.length} accounts</Text>
            </View>
          ) : (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Social Media</Text>
              <Text style={styles?.emptyState}>No social media linked</Text>
            </View>
          )}
        </View>

        {/* Log Out Button */}
        <View style={styles.logOutSection}>
          <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
            <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
