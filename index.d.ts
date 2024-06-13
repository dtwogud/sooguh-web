import { ICoordsState } from "@/src/hooks/useCoords";

interface AppLayoutProps<T = {}> {
  children: React.ReactNode;
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
  coords?: ICoordsState;
}
