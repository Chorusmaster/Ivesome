import { api } from "@/api/axios";

export interface TaxonomySuggestion {
  id: string;
  name: string;
  usageCount: number;
}

async function searchTaxonomy(path: "/skills" | "/tags", search: string) {
  const { data } = await api.get<TaxonomySuggestion[]>(path, {
    params: { search },
  });

  return data;
}

export function getSkillSuggestions(search: string) {
  return searchTaxonomy("/skills", search);
}

export function getTagSuggestions(search: string) {
  return searchTaxonomy("/tags", search);
}
