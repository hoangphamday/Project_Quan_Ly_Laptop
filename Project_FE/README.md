# HuyHoang Frontend

Base project `React + Vite + TypeScript` theo hướng tối giản nhưng sẵn sàng mở rộng cho dự án chuyên nghiệp.

## Stack hiện tại

- React
- Vite
- TypeScript
- ESLint
- Prettier
- Vitest
- Testing Library

## Cấu trúc thư mục

```text
src/
  app/
  assets/
  components/
  features/
  lib/
  test/
  types/
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
- `npm run lint`
- `npm run format`
- `npm run test`

## Ghi chú

- Dùng alias `@/` trỏ tới `src/`
- Đã có `AppProviders` để gắn router, state, query client về sau
- Đã có `.env.example` và typing cho `import.meta.env`
