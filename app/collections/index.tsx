import CollectionCard from "@/components/sections/collections/collection-card";

import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, Animated, Modal } from "react-native";
import { Button, Text } from "@/components/ui";
import { useThemeSwitcher } from "@/context/theme-context";
import { getCollections, Collection } from "@/lib/opensea";
import { useEffect, useState, useRef } from "react";
import { useAccount } from "@/context/account-context";
import { Ionicons } from "@expo/vector-icons";

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      padding: 20,
      flexDirection: "column",
      gap: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    loadingText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "600",
      marginTop: 12,
      opacity: 0.8,
    },
    loadingSubtext: {
      color: theme.colors.text,
      fontSize: 14,
      opacity: 0.6,
      marginTop: 8,
      textAlign: "center",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    emptyText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
    },
    emptySubtext: {
      color: theme.colors.text,
      fontSize: 14,
      opacity: 0.7,
      textAlign: "center",
      lineHeight: 20,
    },
    loadMoreButton: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      margin: 20,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 48,
    },
    loadMoreButtonDisabled: {
      opacity: 0.6,
    },
    loadMoreText: {
      fontSize: 16,
      fontWeight: "600",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerActions: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    headerActionButton: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
    },
    headerActionButtonText: {
      color: theme.colors.background,
      fontSize: 14,
      fontWeight: "600",
    },
    errorContainer: {
      padding: 20,
      alignItems: "center",
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    retryButtonText: {
      color: theme.colors.background,
      fontSize: 14,
      fontWeight: "600",
    },
    shimmerContainer: {
      padding: 20,
    },
    shimmerCard: {
      width: "100%",
      height: 300,
      backgroundColor: theme.colors.border,
      borderRadius: 20,
      marginBottom: 20,
      opacity: 0.6,
    },
});

export function ShimmerLoading() {
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);

  return (
    <View style={styles.shimmerContainer}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.shimmerCard}>
          <View
            style={{
              width: "100%",
              height: 220,
              backgroundColor: theme.colors.border,
              borderRadius: 20,
              marginBottom: 16,
            }}
          />
          <View
            style={{
              width: "70%",
              height: 20,
              backgroundColor: theme.colors.border,
              borderRadius: 4,
              marginBottom: 12,
            }}
          />
          <View
            style={{
              width: "100%",
              height: 16,
              backgroundColor: theme.colors.border,
              borderRadius: 4,
              marginBottom: 16,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View
              style={{
                width: 80,
                height: 32,
                backgroundColor: theme.colors.border,
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 100,
                height: 24,
                backgroundColor: theme.colors.border,
                borderRadius: 12,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export function SortDropdown({ sortBy, onSortChange }: { sortBy: string; onSortChange: (value: string) => void }) {
  const { theme } = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <View style={{ position: "relative" }}>
      <Button variant="outline" size="icon" onPress={() => setIsOpen(true)}>
        <Ionicons name="filter" size={16} color={theme.colors.primary} />
      </Button>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" }} activeOpacity={1} onPress={() => setIsOpen(false)}>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: 12, padding: 20, minWidth: 250, maxWidth: 250 }} onStartShouldSetResponder={() => true}>
            <Text variant="body">Sort Collections</Text>

            <Button variant="outline" onPress={() => handleSortChange("created_date")} style={{ justifyContent: "space-between", borderRadius: 12 }}>
              <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text variant="small">Recently Created</Text>
                {sortBy === "created_date" && <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />}
              </View>
            </Button>
            <Button variant="outline" onPress={() => handleSortChange("market_cap")} style={{ justifyContent: "space-between", borderRadius: 12 }}>
              <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text variant="small">Market Cap</Text>
                {sortBy === "market_cap" && <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />}
              </View>
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export function ListHeader({ sortBy, onSortChange }: { sortBy: string; onSortChange: (value: string) => void }) {
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <Text variant="title" style={{ color: theme.colors.text, flex: 1 }}>
        Collections
      </Text>
      <View style={styles.headerActions}>
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
      </View>
    </View>
  );
}

export function ListEmptyComponent({ account, onRetry }: { account: boolean; onRetry?: () => void }) {
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{account ? "No collections found" : "Connect your wallet"}</Text>
      <Text style={styles.emptySubtext}>{account ? "We couldn't find any collections for your account. Try refreshing or check back later." : "Please connect your wallet to view your NFT collections and discover new ones."}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function ListFooterComponent({ onLoadMore, isLoading, hasMore }: { onLoadMore: () => void; isLoading: boolean; hasMore: boolean }) {
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);

  if (!hasMore) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ color: theme.colors.text, opacity: 0.6, fontSize: 14 }}>You've reached the end of collections</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={[styles.loadMoreButton, { backgroundColor: theme.colors.primary }, isLoading && styles.loadMoreButtonDisabled]} onPress={onLoadMore} disabled={isLoading} activeOpacity={0.8}>
      {isLoading ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.colors.background} style={{ marginRight: 8 }} />
          <Text style={[styles.loadMoreText, { color: theme.colors.background }]}>Loading...</Text>
        </View>
      ) : (
        <Text style={[styles.loadMoreText, { color: theme.colors.background }]}>Load More Collections</Text>
      )}
    </TouchableOpacity>
  );
}

export function ErrorComponent({ error, onRetry }: { error: string; onRetry: () => void }) {
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CollectionsScreen() {
  const { theme } = useThemeSwitcher();
  const { account } = useAccount();
  const styles = createStyles(theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("market_cap");

  const fetchCollections = async (sortCriteria?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getCollections({ limit: 20, order_by: sortCriteria || sortBy });
      setCollections(response.collections ?? []);
      setNext(response.next ?? null);

      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch collections";
      setError(errorMessage);
      setCollections([]);
      console.error("Error fetching collections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      const response = await getCollections({ limit: 20, order_by: sortBy });
      setCollections(response.collections ?? []);
      setNext(response.next ?? null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to refresh collections";
      setError(errorMessage);
      console.error("Error refreshing collections:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCollections([]);
    setNext(null);
    fetchCollections(newSortBy);
  };

  useEffect(() => {
    if (account?.username) {
      fetchCollections();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.username]);

  const loadMore = async () => {
    if (!next || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      setError(null);
      const response = await getCollections({ limit: 20, cursor: next, order_by: sortBy });
      setCollections((prev) => [...prev, ...(response.collections ?? [])]);
      setNext(response.next ?? null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load more collections";
      setError(errorMessage);
      console.error("Error loading more collections:", error);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchCollections();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginBottom: 12 }} />
          <Text style={styles.loadingText}>Loading collections...</Text>
          <Text style={styles.loadingSubtext}>Discovering amazing NFT collections</Text>
        </View>
      </View>
    );
  }

  if (error && collections.length === 0) {
    return (
      <View style={styles.container}>
        <ErrorComponent error={error} onRetry={handleRetry} />
      </View>
    );
  }

  if (collections.length === 0 && !isLoading && !error) {
    return (
      <View style={styles.container}>
        <ListEmptyComponent account={!!account?.username} onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={collections}
          renderItem={({ item }) => <CollectionCard data={item} />}
          keyExtractor={(item) => item.collection}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <ListHeader sortBy={sortBy} onSortChange={handleSortChange} />}
          ListFooterComponent={() => <ListFooterComponent onLoadMore={loadMore} isLoading={isLoadingMore} hasMore={!!next} />}
          ListEmptyComponent={() => <ListEmptyComponent account={!!account?.username} onRetry={handleRetry} />}
          contentContainerStyle={[styles.contentContainer, { zIndex: 1 }]}
          style={{ zIndex: 1 }}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} colors={[theme.colors.primary]} />}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          windowSize={5}
          initialNumToRender={6}
          updateCellsBatchingPeriod={100}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (next && !isLoadingMore) {
              loadMore();
            }
          }}
        />
      </Animated.View>
    </View>
  );
}
