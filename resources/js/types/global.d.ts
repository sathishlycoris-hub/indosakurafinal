import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

declare global {
    interface Window {
        axios: AxiosInstance;
        
    }

    var route: typeof ziggyRoute;
}

declare global {
  interface PageProps extends InertiaPageProps {
    flash?: {
      success?: string;
      error?: string;
    };
    auth?: {
       user: User;
    };
  }
  
}

declare global {
  interface Window {
    grecaptcha?: {
      reset: () => void;
    };
  }
}