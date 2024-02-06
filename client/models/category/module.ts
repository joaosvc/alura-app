export interface CategoryModule {
  [course: string]: string;
}

export interface CategoryModules {
  [module: string]: CategoryModule;
}
