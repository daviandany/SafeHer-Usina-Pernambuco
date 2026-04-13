# SafeHer Clean Architecture (WebApp)

## Estrutura sugerida

```txt
src/app
├─ core/
│  └─ config/
│     ├─ services.ts
│     └─ supabaseClient.ts
├─ features/
│  ├─ auth/
│  │  ├─ domain/
│  │  ├─ data/
│  │  └─ application/
│  ├─ emergency/
│  │  ├─ domain/
│  │  ├─ data/
│  │  └─ application/
│  └─ dashboard/
│     └─ presentation/
│        ├─ components/
│        ├─ hooks/
│        └─ pages/
└─ components/
   └─ AppDashboard.tsx
```

## Notas
- **Domain**: contratos e entidades sem detalhes de framework.
- **Data**: implementações concretas com Supabase.
- **Presentation**: UI, hooks e interação com casos de uso.
