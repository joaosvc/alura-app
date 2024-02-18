export interface CourseModule {
  name: string;
  module: string;
  videos: {
    video: string;
    name: string;
  }[];
}

export interface CourseModules {
  courseName: string;
  modules: CourseModule[];
}
