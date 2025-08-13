import { View, StyleSheet, Image } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Collection } from "@/lib/opensea";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

interface CollectionCardProps {
  data: Collection;
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
    },
    imageContainer: {
      width: "100%",
      height: 200,
      borderRadius: 16,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    contentContainer: {
      padding: 16,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 8,
    },
    description: {
      color: theme.colors.text,
      fontSize: 14,
      opacity: 0.7,
      marginTop: 4,
      lineHeight: 20,
    },
    button: {
      marginTop: 16,
    },
  });

export default function CollectionCard({ data }: CollectionCardProps) {
  const { theme } = useThemeSwitcher();
  const styles = createStyles(theme);

  const handleViewCollection = () => {
    router.push(`/collections/collection/${data.collection}`);
  };

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.slice(0, maxLength)}...`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: data.banner_image_url || data.image_url }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {data.name}
        </Text>
        
        {data.description && (
          <Text style={styles.description}>
            {truncateDescription(data.description)}
          </Text>
        )}
        
        <Button variant="outline" onPress={handleViewCollection} style={styles.button}>
          <Text variant="small">View Collection</Text>
        </Button>
      </View>
    </View>
  );
}
