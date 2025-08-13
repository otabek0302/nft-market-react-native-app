import { View, Text, ScrollView, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Collection, getCollection, getNFSByCollection, NFT } from "@/lib/opensea";
import { Button } from "@/components/ui";
import { useThemeSwitcher } from "@/context/theme-context";
import { Ionicons } from "@expo/vector-icons";

import NFTCard from "@/components/sections/nfts/nft-card";

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    loadingText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      marginTop: 16,
      opacity: 0.8,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
      color: theme.colors.error,
      lineHeight: 24,
    },
    bannerImage: {
      width: "100%",
      height: 250,
      backgroundColor: theme.colors.border,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    header: {
      flexDirection: "row",
      padding: 20,
      alignItems: "center",
      backgroundColor: theme.colors.card,
      margin: 20,
      borderRadius: 12,
    },
    imageContainer: {
      marginRight: 20,
    },
    collectionImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    placeholderImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.border,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    placeholderText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.text,
      opacity: 0.6,
    },
    headerInfo: {
      flex: 1,
    },
    collectionName: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      color: theme.colors.text,
      lineHeight: 30,
    },
    collectionSymbol: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: theme.colors.primary,
      opacity: 0.8,
    },
    ownerText: {
      fontSize: 14,
      opacity: 0.7,
      color: theme.colors.text,
    },
    detailsContainer: {
      padding: 20,
    },
    section: {
      marginBottom: 30,
      backgroundColor: theme.colors.card,
      padding: 20,
      borderRadius: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 16,
      color: theme.colors.text,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
      opacity: 0.9,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
    },
    statItem: {
      width: "48%",
      alignItems: "center",
      padding: 16,
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    statValue: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 6,
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 12,
      textAlign: "center",
      opacity: 0.7,
      color: theme.colors.text,
      fontWeight: "500",
    },
    socialLinks: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    socialButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    buttonText: {
      color: theme.colors.background,
      fontWeight: "600",
      fontSize: 14,
    },
    externalLinks: {
      gap: 12,
    },
    externalButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    externalButtonText: {
      color: theme.colors.primary,
      fontWeight: "600",
      fontSize: 14,
    },
    categoryBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      alignSelf: "flex-start",
      marginBottom: 8,
    },
    categoryText: {
      color: theme.colors.background,
      fontSize: 12,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    nftContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    nftLoadingContainer: {
      padding: 20,
      alignItems: "center",
    },
    nftLoadingText: {
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.7,
      marginTop: 12,
    },
    nftEmptyContainer: {
      padding: 40,
      alignItems: "center",
    },
    nftEmptyText: {
      fontSize: 16,
      color: theme.colors.text,
      opacity: 0.6,
      textAlign: "center",
      marginTop: 12,
    },
    loadMoreContainer: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    nftCountText: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      marginBottom: 16,
    },
  });

export default function CollectionPage() {
  const { id } = useLocalSearchParams();
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [nftsLoading, setNftsLoading] = useState(false);
  const [nftsError, setNftsError] = useState<string | null>(null);
  const [nftsCursor, setNftsCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreNFTs, setHasMoreNFTs] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCollection(id as string);
      fetchNFTs(id as string);
    }
  }, [id]);

  const fetchCollection = async (collectionId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCollection(collectionId);
      setCollection(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch collection";
      setError(errorMessage);
      console.error("Error fetching collection:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNFTs = async (collectionId: string, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setNftsLoading(true);
      }
      setNftsError(null);

      const response = await getNFSByCollection(collectionId, nftsCursor || undefined);

      if (Array.isArray(response)) {
        if (isLoadMore) {
          setNfts((prev) => [...prev, ...response]);
        } else {
          setNfts(response);
        }
        setHasMoreNFTs(response.length === 50);
      } else if (response && typeof response === "object" && "nfts" in (response as any)) {
        const nftsArray = (response as any).nfts || [];
        if (isLoadMore) {
          setNfts((prev) => [...prev, ...nftsArray]);
        } else {
          setNfts(nftsArray);
        }
        setHasMoreNFTs(nftsArray.length === 50);
      } else {
        setNfts([]);
        setHasMoreNFTs(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch NFTs";
      setNftsError(errorMessage);
      console.error("Error fetching NFTs:", err);
    } finally {
      if (isLoadMore) {
        setIsLoadingMore(false);
      } else {
        setNftsLoading(false);
      }
    }
  };

  const loadMoreNFTs = () => {
    if (!isLoadingMore && hasMoreNFTs && id) {
      fetchNFTs(id as string, true);
    }
  };

  const retryFetch = () => {
    if (id) {
      fetchCollection(id as string);
      fetchNFTs(id as string);
    }
  };

  const openExternalLink = (url: string) => {
    Alert.alert("External Link", `Would open: ${url}`);
  };

  const handleNFTPress = (nft: NFT) => {
    console.log("NFT pressed:", nft);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading collection...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={theme.colors.error} style={{ marginBottom: 16 }} />
          <Text style={styles.errorText}>{error}</Text>
          <Button variant="default" onPress={retryFetch}>
            <Text style={{ color: theme.colors.background, fontWeight: "600" }}>Try Again</Text>
          </Button>
        </View>
      </View>
    );
  }

  if (!collection) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="search" size={48} color={theme.colors.text} style={{ marginBottom: 16, opacity: 0.6 }} />
          <Text style={[styles.errorText, { color: theme.colors.text }]}>Collection not found</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner Image */}
      {collection.banner_image_url ? (
        <Image source={{ uri: collection.banner_image_url }} style={styles.bannerImage} resizeMode="cover" />
      ) : (
        <View style={[styles.bannerImage, { justifyContent: "center", alignItems: "center" }]}>
          <Ionicons name="images-outline" size={48} color={theme.colors.text} style={{ opacity: 0.3 }} />
        </View>
      )}

      {/* Collection Header */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {collection.image_url ? (
            <Image source={{ uri: collection.image_url }} style={styles.collectionImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.collectionName}>{collection.name}</Text>
          <Text style={styles.collectionSymbol}>{collection.collection}</Text>
          <Text style={styles.ownerText}>Owned by {collection.owner}</Text>
        </View>
      </View>

      {/* Collection Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collection Details</Text>

          {collection.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{collection.category}</Text>
            </View>
          )}

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{collection.safelist_status?.status || "N/A"}</Text>
              <Text style={styles.statLabel}>Safelist Status</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{collection.trait_offers_enabled ? "Yes" : "No"}</Text>
              <Text style={styles.statLabel}>Trait Offers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{collection.collection_offers_enabled ? "Yes" : "No"}</Text>
              <Text style={styles.statLabel}>Collection Offers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{collection.is_disabled ? "Disabled" : "Active"}</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </View>

        {/* Social Links */}
        {(collection.twitter_username || collection.discord_url || collection.telegram_url || collection.instagram_username) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Links</Text>
            <View style={styles.socialLinks}>
              {collection.twitter_username && (
                <Button variant="default" onPress={() => openExternalLink(`https://twitter.com/${collection.twitter_username}`)}>
                  <Ionicons name="logo-twitter" size={16} color={theme.colors.background} />
                  <Text style={styles.buttonText}>Twitter</Text>
                </Button>
              )}
              {collection.discord_url && (
                <Button variant="default" onPress={() => openExternalLink(collection.discord_url)}>
                  <Ionicons name="logo-discord" size={16} color={theme.colors.background} />
                  <Text style={styles.buttonText}>Discord</Text>
                </Button>
              )}
              {collection.telegram_url && (
                <Button variant="default" onPress={() => openExternalLink(collection.telegram_url)}>
                  <Ionicons name="chatbubble-ellipses" size={16} color={theme.colors.background} />
                  <Text style={styles.buttonText}>Telegram</Text>
                </Button>
              )}
              {collection.instagram_username && (
                <Button variant="default" onPress={() => openExternalLink(`https://instagram.com/${collection.instagram_username}`)}>
                  <Ionicons name="logo-instagram" size={16} color={theme.colors.background} />
                  <Text style={styles.buttonText}>Instagram</Text>
                </Button>
              )}
            </View>
          </View>
        )}

        {/* External Links */}
        {(collection.opensea_url || collection.project_url || collection.wiki_url) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>External Links</Text>
            <View style={styles.externalLinks}>
              {collection.opensea_url && (
                <Button variant="outline" onPress={() => openExternalLink(collection.opensea_url)}>
                  <Ionicons name="open-outline" size={16} color={theme.colors.primary} />
                  <Text style={styles.externalButtonText}>View on OpenSea</Text>
                </Button>
              )}
              {collection.project_url && (
                <Button variant="outline" onPress={() => openExternalLink(collection.project_url)}>
                  <Ionicons name="globe-outline" size={16} color={theme.colors.primary} />
                  <Text style={styles.externalButtonText}>Project Website</Text>
                </Button>
              )}
              {collection.wiki_url && (
                <Button variant="outline" onPress={() => openExternalLink(collection.wiki_url)}>
                  <Ionicons name="library-outline" size={16} color={theme.colors.primary} />
                  <Text style={styles.externalButtonText}>Wiki</Text>
                </Button>
              )}
            </View>
          </View>
        )}
      </View>
      
      {/* NFTs Section */}
      <View style={styles.nftContainer}>
        <Text style={styles.sectionTitle}>NFTs in Collection</Text>

        {nfts.length > 0 && <Text style={styles.nftCountText}>Showing {nfts.length} NFTs</Text>}

        {nftsLoading ? (
          <View style={styles.nftLoadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.nftLoadingText}>Loading NFTs...</Text>
          </View>
        ) : nftsError ? (
          <View style={styles.nftLoadingContainer}>
            <Ionicons name="alert-circle" size={32} color={theme.colors.error} style={{ marginBottom: 8 }} />
            <Text style={[styles.nftLoadingText, { color: theme.colors.error }]}>{nftsError}</Text>
            <Button variant="outline" onPress={() => fetchNFTs(id as string)} style={{ marginTop: 12 }}>
              <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>Retry</Text>
            </Button>
          </View>
        ) : nfts.length > 0 ? (
          <>
            <View style={{ flexDirection: "column", gap: 16, flex: 1, paddingBottom: 20 }}>
              {nfts.map((nft, index) => (
                <NFTCard nft={nft} onPress={handleNFTPress} key={`${id}-${nft.identifier}-${index}`} />
              ))}
            </View>

            {/* Load More Button */}
            {hasMoreNFTs && (
              <View style={styles.loadMoreContainer}>
                <Button variant="outline" onPress={loadMoreNFTs} disabled={isLoadingMore} style={{ width: "100%" }}>
                  {isLoadingMore ? (
                    <>
                      <ActivityIndicator size="small" color={theme.colors.primary} style={{ marginRight: 8 }} />
                      <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>Loading...</Text>
                    </>
                  ) : (
                    <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>Load More NFTs</Text>
                  )}
                </Button>
              </View>
            )}
          </>
        ) : (
          <View style={styles.nftEmptyContainer}>
            <Ionicons name="images-outline" size={48} color={theme.colors.text} style={{ opacity: 0.3 }} />
            <Text style={styles.nftEmptyText}>No NFTs found in this collection</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
