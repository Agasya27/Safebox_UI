export type Category = "document" | "password" | "note";

export interface CardItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  password?: string; // Only for password type cards
}

export const dummyCards: CardItem[] = [
  {
    id: "1",
    title: "Bank Statement Q4",
    category: "document",
    description: "Quarterly financial summary from Chase Bank for tax records.",
  },
  {
    id: "2",
    title: "Netflix Account",
    category: "password",
    description: "Family streaming account credentials.",
    password: "Netfl1x@2024!",
  },
  {
    id: "3",
    title: "Grocery List Ideas",
    category: "note",
    description: "Weekly meal prep notes and shopping reminders.",
  },
  {
    id: "4",
    title: "Insurance Policy",
    category: "document",
    description: "Home insurance policy documents and coverage details.",
  },
  {
    id: "5",
    title: "Email Login",
    category: "password",
    description: "Primary Gmail account access.",
    password: "simple123",
  },
  {
    id: "6",
    title: "Vacation Plans",
    category: "note",
    description: "Summer trip itinerary and hotel booking confirmations.",
  },
  {
    id: "7",
    title: "Router Admin",
    category: "password",
    description: "Home WiFi router configuration access.",
    password: "admin2024",
  },
  {
    id: "8",
    title: "Tax Return 2024",
    category: "document",
    description: "Filed tax documents and IRS correspondence.",
  },
];

export const getCategoryLabel = (category: Category): string => {
  const labels: Record<Category, string> = {
    document: "Document",
    password: "Password",
    note: "Note",
  };
  return labels[category];
};

export const getCategoryColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    document: "bg-blue-100 text-blue-700",
    password: "bg-amber-100 text-amber-700",
    note: "bg-violet-100 text-violet-700",
  };
  return colors[category];
};
