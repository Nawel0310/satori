"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDemoData } from "@/context/demo-data-context";
import { ClientFilters } from "@/components/crm/ClientFilters";
import { ClientTable } from "@/components/crm/ClientTable";
import { Button } from "@/components/ui/Button";
import { ClientsIcon } from "@/components/ui/icons";
import { normalizeSearchText } from "@/lib/format";
import type { ClientType, PipelineStage } from "@/lib/types";

export default function CrmPage() {
  const { clients, productions } = useDemoData();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ClientType | "todos">("todos");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "todas">("todas");

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = normalizeSearchText(client.name).includes(normalizeSearchText(search.trim()));
      const matchesType = typeFilter === "todos" || client.type === typeFilter;
      const clientProduction = productions.find((p) => p.clientId === client.id);
      const matchesStage =
        stageFilter === "todas" || (clientProduction && clientProduction.stage === stageFilter);
      return matchesSearch && matchesType && matchesStage;
    });
  }, [clients, productions, search, typeFilter, stageFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <ClientsIcon width={28} height={28} className="text-primary" />
            <h1 className="font-heading text-3xl font-bold text-primary">Clientes y agencias</h1>
          </div>
          <p className="mt-1 text-sm text-secondary">
            Cada cliente, con todo su historial. Nada se pierde entre producciones.
          </p>
        </div>
        <Link href="/clientes/nuevo">
          <Button>+ Nuevo cliente</Button>
        </Link>
      </header>

      <div className="mb-6">
        <ClientFilters
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          stageFilter={stageFilter}
          onStageChange={setStageFilter}
        />
      </div>

      <ClientTable clients={filteredClients} />
    </div>
  );
}
