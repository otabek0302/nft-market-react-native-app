// OpenSea API Types and Functions
export type OpenSeaAccount = {
  address: string;
  username?: string;
  profile_image_url?: string;
  banner_image_url?: string;
  website?: string;
  social_media_accounts?: { platform: string; username: string }[];
  bio?: string;
  joined_date?: string;
};

export type NFT = {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  display_image_url: string;
  display_animation_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
};

export type Collection = {
  collection: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  owner: string;
  safelist_status: Record<string, any>;
  category: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  trait_offers_enabled: boolean;
  collection_offers_enabled: boolean;
  opensea_url: string;
  project_url: string;
  wiki_url: string;
  discord_url: string;
  telegram_url: string;
  twitter_username: string | null;
  instagram_username: string;
  contracts: { address: string }[];
  editors?: string[];
  fees?: {
    fee: number;
    recipient: string;
    required: boolean;
  }[];
  required_zone?: string;
  rarity?: {
    strategy_version: string;
    calculated_at: string;
    max_rank: number;
    total_supply: number;
  };
  payment_tokens?: {
    symbol: string;
    address: string;
    chain: string;
    image: string;
    name: string;
    decimals: number;
    eth_price: string;
    usd_price: string;
  }[];
  total_supply?: number;
  created_date?: string;
};

export type CollectionsResponse = {
  collections: Collection[];
  next?: string;
};

// API Base Configuration
const OPENSEA_BASE_URL = 'https://api.opensea.io/api/v2';
const API_KEY = process.env.EXPO_PUBLIC_OPENSEA_API_KEY ?? '';

// Helper function for API requests
async function makeOpenSeaRequest(endpoint: string, params?: URLSearchParams): Promise<any> {
  const url = params ? `${OPENSEA_BASE_URL}${endpoint}?${params.toString()}` : `${OPENSEA_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenSea API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// API Functions
export async function getAccount(addressOrUsername: string): Promise<OpenSeaAccount> {
  return makeOpenSeaRequest(`/accounts/${addressOrUsername}`);
}

export async function getCollections({ 
  limit = 100, 
  cursor, 
  order_by = "market_cap" 
}: { 
  limit?: number; 
  cursor?: string; 
  order_by?: string 
}): Promise<CollectionsResponse> {
  const params = new URLSearchParams();
  
  if (limit) params.append('limit', limit.toString());
  if (cursor) params.append('next', cursor);
  if (order_by) params.append('order_by', order_by);

  return makeOpenSeaRequest('/collections', params);
}

export async function getCollection(collection: string): Promise<Collection> {
  return makeOpenSeaRequest(`/collections/${collection}`);
}

export async function getNFSByCollection(collection: string, cursor?: string): Promise<NFT[]> {
  const params = new URLSearchParams();
  
  if (cursor) params.append('next', cursor);

  return makeOpenSeaRequest(`/collection/${collection}/nfts`, params);
}