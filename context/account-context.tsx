import { createContext, useContext, useState, ReactNode } from "react";
import { OpenSeaAccount } from "@/lib/opensea";

interface AccountContextType {
  account: OpenSeaAccount | null;
  setAccount: (account: OpenSeaAccount | null) => void;
  clearAccount: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<OpenSeaAccount | null>(null);

  const clearAccount = () => {
    setAccount(null);
  };

  return <AccountContext.Provider value={{ account, setAccount, clearAccount }}>{children}</AccountContext.Provider>;
};
