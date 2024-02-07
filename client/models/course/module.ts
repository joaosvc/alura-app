export interface CourseModule {
  module: string;
  videos: string[];
}

export interface CourseModules {
  courseName: string;
  modules: CourseModule[];
}
