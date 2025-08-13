import React, { memo, useMemo, useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "@/components/ui";
import { NFT } from "@/lib/opensea";

type NFTCardProps = {
  nft: NFT;
  onPress?: (nft: NFT) => void;
  onFavoriteToggle?: (nft: NFT) => void;
};

const NFTCard = memo(
  function NFTCard({ nft, onPress, onFavoriteToggle }: NFTCardProps) {
    const { theme } = useThemeSwitcher();
    const [imgLoading, setImgLoading] = useState(true);
    const [fav, setFav] = useState(false);

    const styles = useMemo(
      () =>
        StyleSheet.create({
          card: {
            flex: 1,
            backgroundColor: theme.colors.background,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          },
          imageWrap: {
            width: "100%",
            aspectRatio: 1,
            backgroundColor: theme.colors.border,
            position: "relative",
          },
          image: { 
            width: "100%", 
            height: "100%", 
            resizeMode: "cover" 
          },
          imgPlaceholder: {
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
          },
          headerRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingTop: 12,
          },
          titleWrap: { 
            flex: 1, 
            paddingRight: 8 
          },
          name: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "700",
          },
          collection: {
            color: theme.colors.text,
            fontSize: 12,
            marginTop: 2,
            opacity: 0.7,
          },
          heartBtn: {
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.border,
          },
          footerRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingVertical: 12,
          },
          actionBtn: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 10,
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.border,
          },
          openSeaBtn: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 10,
            backgroundColor: theme.colors.primary,
          },
          openSeaLabel: {
            color: theme.colors.background,
            fontSize: 12,
            fontWeight: "700",
          },
          actionLabel: {
            color: theme.colors.text,
            fontSize: 12,
            fontWeight: "600",
          },
        }),
      [theme]
    );

    const title = nft.name?.trim() || `#${nft.identifier}`;
    const collectionName = nft.collection || "Collection";
    const imageSrc = nft.image_url || nft.display_image_url;

    const handleOpenSea = useCallback(() => {
      if (nft.opensea_url) {
        Linking.openURL(nft.opensea_url).catch(() => {
          console.warn("Failed to open OpenSea URL");
        });
      }
    }, [nft.opensea_url]);

    const handlePress = useCallback(() => {
      onPress?.(nft);
    }, [onPress, nft]);

    const toggleFav = useCallback(() => {
      const next = !fav;
      setFav(next);
      onFavoriteToggle?.(nft);
    }, [fav, nft, onFavoriteToggle]);

    const formatDate = (dateString?: string) => {
      if (!dateString) return "N/A";
      try {
        return new Date(dateString).toLocaleDateString();
      } catch {
        return "N/A";
      }
    };

    return (
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress} style={styles.card}>
        {/* Image */}
        <View style={styles.imageWrap}>
          {imageSrc ? (
            <>
              <Image 
                source={{ uri: imageSrc }} 
                style={styles.image} 
                onLoadEnd={() => setImgLoading(false)} 
              />
              {imgLoading && (
                <View style={styles.imgPlaceholder}>
                  <ActivityIndicator />
                </View>
              )}
            </>
          ) : (
            <View style={styles.imgPlaceholder}>
              <Ionicons name="image-outline" size={28} color={theme.colors.text} />
            </View>
          )}
        </View>

        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <Text style={styles.name} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.collection} numberOfLines={1}>
              {collectionName}
            </Text>
          </View>

          <TouchableOpacity style={styles.heartBtn} onPress={toggleFav}>
            <Ionicons 
              name={fav ? "heart" : "heart-outline"} 
              size={16} 
              color={fav ? theme.colors.primary : theme.colors.text} 
            />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={styles.actionBtn}>
              <Ionicons name="pricetag-outline" size={14} color={theme.colors.text} />
              <Text style={styles.actionLabel}>ERC-721</Text>
            </View>
            <View style={styles.actionBtn}>
              <Ionicons name="time-outline" size={14} color={theme.colors.text} />
              <Text style={styles.actionLabel}>{formatDate(nft.updated_at)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.openSeaBtn} onPress={handleOpenSea}>
            <Text style={styles.openSeaLabel}>OpenSea</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  },
  (prev, next) => 
    prev.nft.identifier === next.nft.identifier && 
    prev.nft.opensea_url === next.nft.opensea_url && 
    prev.nft.image_url === next.nft.image_url
);

export default NFTCard;
