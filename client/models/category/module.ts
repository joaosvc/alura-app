export interface CategoryModule {
  [course: string]: {
    uuid: string;
    icon: string;
  };
}

export interface CategoryModules {
  [module: string]: CategoryModule;
}
