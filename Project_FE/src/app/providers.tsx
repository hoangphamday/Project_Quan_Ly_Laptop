import type { PropsWithChildren } from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
