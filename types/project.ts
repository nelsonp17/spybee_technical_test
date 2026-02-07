export interface User {
  name: string;
  lastName: string;
}

export interface Coordinates {
  _id?: string;
  lat: number;
  lng: number;
}

export type IncidentStatusType = "active" | "resolved" | "pending";

export interface Incident {
  _id: string;
  status: IncidentStatusType;
  item: string;
  description: string;
  owner: string;
  tag: string;
  coordinates: Coordinates;
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPlan {
  _id: string;
}

export interface ClientData {
  title: string;
  _id: string;
}

export type ProjectPlanType = "small" | "big";

export interface ProjectPlanData {
  plan: ProjectPlanType;
}

export type ProjectStatusType =
  | "active"
  | "inactive"
  | "pending_payment"
  | "suspended";

// Interface principal
export interface ProjectData {
  _id: string;
  title: string;
  projectPlan: ProjectPlan;
  status: ProjectStatusType;
  img: string;
  lastVisit: string;
  position: Coordinates;
  users: User[];
  clientData: ClientData;
  city: string;
  lastUpdated: string;
  partnerClients: string[];
  companyId: string;
  address: string;
  projectClientAdmin: string[];
  projectPlanData: ProjectPlanData;
  createdAt: string;
  incidents: Incident[];
}
